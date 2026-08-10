-- Kırıntı Madencilik — profiles tablosu

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  title text default 'Yeni Keşifçi',
  points integer not null default 0,
  post_count integer not null default 0,
  discovery_count integer not null default 0,
  follower_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiller herkese açık"
  on public.profiles for select
  using (true);

create policy "Kullanıcı kendi profilini günceller"
  on public.profiles for update
  using (auth.uid() = id);

-- auth.users içinde yeni kullanıcı oluşunca profiles satırını otomatik oluşturur
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- posts tablosu (Keşif Paylaşımları)

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  location text,
  description text not null,
  image_url text,
  likes_count integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;

create policy "Gönderiler herkese açık"
  on public.posts for select
  using (true);

create policy "Kullanıcı kendi gönderisini oluşturur"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "Kullanıcı kendi gönderisini günceller"
  on public.posts for update
  using (auth.uid() = user_id);

create policy "Kullanıcı kendi gönderisini siler"
  on public.posts for delete
  using (auth.uid() = user_id);

-- Yeni gönderi eklenince/silinince profildeki post_count sayacını günceller
create or replace function public.handle_post_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.profiles set post_count = post_count + 1 where id = new.user_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.profiles set post_count = greatest(post_count - 1, 0) where id = old.user_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_post_created
  after insert on public.posts
  for each row execute procedure public.handle_post_count();

create trigger on_post_deleted
  after delete on public.posts
  for each row execute procedure public.handle_post_count();

-- Storage: "posts" bucket politikaları
-- (bucket'ı public olarak Supabase Storage panelinden oluşturduktan sonra çalıştır)

create policy "posts bucket herkese açık okuma"
  on storage.objects for select
  using (bucket_id = 'posts');

create policy "posts bucket kullanıcı kendi klasörüne yükler"
  on storage.objects for insert
  with check (
    bucket_id = 'posts'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "posts bucket kullanıcı kendi dosyasını siler"
  on storage.objects for delete
  using (
    bucket_id = 'posts'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
