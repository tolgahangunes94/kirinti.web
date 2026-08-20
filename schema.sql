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

-- post_comments tablosu (Yorumlar)

create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.post_comments enable row level security;

create policy "Yorumlar herkese açık"
  on public.post_comments for select
  using (true);

create policy "Kullanıcı kendi yorumunu oluşturur"
  on public.post_comments for insert
  with check (auth.uid() = user_id);

create policy "Kullanıcı kendi yorumunu siler"
  on public.post_comments for delete
  using (auth.uid() = user_id);

-- Yeni yorum eklenince/silinince gönderideki comments_count sayacını günceller
create or replace function public.handle_post_comments_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.posts set comments_count = comments_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.posts set comments_count = greatest(comments_count - 1, 0) where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_post_comment_created
  after insert on public.post_comments
  for each row execute procedure public.handle_post_comments_count();

create trigger on_post_comment_deleted
  after delete on public.post_comments
  for each row execute procedure public.handle_post_comments_count();

-- post_likes tablosu (Beğeniler)

create table if not exists public.post_likes (
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.post_likes enable row level security;

create policy "Beğeniler herkese açık"
  on public.post_likes for select
  using (true);

create policy "Kullanıcı kendi beğenisini oluşturur"
  on public.post_likes for insert
  with check (auth.uid() = user_id);

create policy "Kullanıcı kendi beğenisini siler"
  on public.post_likes for delete
  using (auth.uid() = user_id);

-- Yeni beğeni eklenince/silinince gönderideki likes_count sayacını günceller
create or replace function public.handle_post_likes_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.posts set likes_count = likes_count + 1 where id = new.post_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.posts set likes_count = greatest(likes_count - 1, 0) where id = old.post_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_post_like_created
  after insert on public.post_likes
  for each row execute procedure public.handle_post_likes_count();

create trigger on_post_like_deleted
  after delete on public.post_likes
  for each row execute procedure public.handle_post_likes_count();

-- geological_zones tablosu (Jeolojik Bölgeler)

create table public.geological_zones (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  zone_type text not null, -- 'quartz_vein', 'geothermal', 'mineral_deposit'
  city text,
  region text,
  description text,
  potential_level text, -- 'Yüksek', 'Orta', 'Araştırılıyor'
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz default now()
);

alter table public.geological_zones enable row level security;

create policy "Geological zones herkese açık"
on public.geological_zones
for select
to public
using (true);

-- discoveries tablosu (Keşif Kayıtları)

create table if not exists public.discoveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  city text not null,
  district text,
  rock_type text,
  mineral_trace text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.discoveries enable row level security;

create policy "Keşif kayıtları herkese açık"
  on public.discoveries for select
  using (true);

create policy "Kullanıcı kendi keşif kaydını oluşturur"
  on public.discoveries for insert
  with check (auth.uid() = user_id);

create policy "Kullanıcı kendi keşif kaydını siler"
  on public.discoveries for delete
  using (auth.uid() = user_id);

-- Yeni keşif kaydı eklenince/silinince profildeki discovery_count sayacını günceller
create or replace function public.handle_discovery_count()
returns trigger as $$
begin
  if (tg_op = 'INSERT') then
    update public.profiles set discovery_count = discovery_count + 1 where id = new.user_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.profiles set discovery_count = greatest(discovery_count - 1, 0) where id = old.user_id;
    return old;
  end if;
  return null;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_discovery_created
  after insert on public.discoveries
  for each row execute procedure public.handle_discovery_count();

create trigger on_discovery_deleted
  after delete on public.discoveries
  for each row execute procedure public.handle_discovery_count();

-- Storage: "discoveries" bucket politikaları
-- (bucket'ı public olarak Supabase Storage panelinden oluşturduktan sonra çalıştır)

create policy "discoveries bucket herkese açık okuma"
  on storage.objects for select
  using (bucket_id = 'discoveries');

create policy "discoveries bucket kullanıcı kendi klasörüne yükler"
  on storage.objects for insert
  with check (
    bucket_id = 'discoveries'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "discoveries bucket kullanıcı kendi dosyasını siler"
  on storage.objects for delete
  using (
    bucket_id = 'discoveries'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
