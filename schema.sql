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

-- discoveries tablosu (Keşif Kayıtları — kişisel/gizli saha günlüğü, herkese açık DEĞİL)

create table if not exists public.discoveries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  city text not null,
  district text not null,
  village_or_area text,
  stream_or_site_name text,
  rock_type text,
  field_notes text not null,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now()
);

alter table public.discoveries enable row level security;

create policy "Kullanıcı yalnızca kendi keşif kayıtlarını görür"
  on public.discoveries for select
  using (auth.uid() = user_id);

create policy "Kullanıcı kendi keşif kaydını oluşturur"
  on public.discoveries for insert
  with check (auth.uid() = user_id);

create policy "Kullanıcı kendi keşif kaydını günceller"
  on public.discoveries for update
  using (auth.uid() = user_id)
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

-- discovery_images tablosu (bir keşif kaydına ait en fazla 3 fotoğraf)

create table if not exists public.discovery_images (
  id uuid primary key default gen_random_uuid(),
  discovery_id uuid not null references public.discoveries (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  image_path text not null,
  position smallint not null default 0 check (position in (0, 1, 2)),
  created_at timestamptz not null default now(),
  unique (discovery_id, position)
);

alter table public.discovery_images enable row level security;

create policy "Kullanıcı yalnızca kendi keşif görsellerini görür"
  on public.discovery_images for select
  using (auth.uid() = user_id);

create policy "Kullanıcı kendi keşif görselini oluşturur"
  on public.discovery_images for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.discoveries d
      where d.id = discovery_id
        and d.user_id = auth.uid()
    )
  );

create policy "Kullanıcı kendi keşif görselini siler"
  on public.discovery_images for delete
  using (auth.uid() = user_id);

-- Storage: "discoveries" bucket politikaları
-- ÖNEMLİ: bucket PRIVATE olmalı ("Public bucket" KAPALI) — kayıtlar artık gizli.
-- Supabase Storage panelinden bucket'ı private oluşturduktan/işaretledikten sonra çalıştır.

create policy "discoveries bucket kullanıcı kendi görsellerini okur"
  on storage.objects for select
  using (
    bucket_id = 'discoveries'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

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

-- geological_zones tablosuna kaynak/kanıt alanları (sourced geological records)

alter table public.geological_zones
  add column if not exists evidence_level text; -- 'documented' | 'regional_indicator'

alter table public.geological_zones
  add column if not exists source_name text;

alter table public.geological_zones
  add column if not exists source_url text;

-- İzmir pilot verileri (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Efemçukuru Altın Sahası', 'mineral_deposit', 'İzmir', 'Menderes / Efemçukuru',
  'Efemçukuru çevresinde belgelenmiş epitermal damar tipi altın cevherleşmesi ve aktif yeraltı altın madeni bulunmaktadır. Bu kayıt doğrudan belgelenmiş maden/cevherleşme sahasını gösterir.',
  'high', 38.292108, 26.975083, 'documented',
  'Eldorado Gold — Efemçukuru Technical Report 2023',
  'https://www.eldoradogold.com/sites/eldorado-gold/files/eldorado/assets/operations/efemcukuru/efm-technical-report-2023-12-31-final.pdf'
where not exists (
  select 1 from public.geological_zones where title = 'Efemçukuru Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Ovacık–Bergama Epitermal Altın Bölgesi', 'mineral_deposit', 'İzmir', 'Bergama / Ovacık',
  'Ovacık çevresinde düşük sülfidasyonlu epitermal Au-Ag cevherleşmesi ve altın taşıyan kuvars damarları bilimsel çalışmalarla belgelenmiştir. Koordinat bu sürümde bölgesel gösterim amaçlıdır; damar veya ocak sınırı değildir.',
  'high', 39.073502, 27.076567, 'documented',
  'Ore Geology Reviews — Low-sulfidation Au-Ag mineralization at Bergama',
  'https://doi.org/10.1016/j.oregeorev.2006.10.007'
where not exists (
  select 1 from public.geological_zones where title = 'Ovacık–Bergama Epitermal Altın Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Arapdağ–Altıntepe Altınlı Kuvars Bölgesi', 'quartz_vein', 'İzmir', 'Karşıyaka / Sancaklı–Arapdağ',
  'MTA çalışmalarında Arapdağ ve Altıntepe çevresinde dasitik birimler içindeki çatlak ve kırıklara bağlı altınlı kuvars filonları ile Au-Ag cevherleşmeleri belgelenmiştir. Koordinat bölgesel gösterim amaçlıdır.',
  'high', 38.518630, 27.154110, 'documented',
  'MTA Rapor No 12760 — Arap Dağı Altın Yatağı Jeoşimi Etüdü',
  'https://eticaret.mta.gov.tr/index.php?product_id=19278&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Arapdağ–Altıntepe Altınlı Kuvars Bölgesi'
);

-- İzmir pilot verileri, 2. paket (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Gödence Altın Mineralizasyon Bölgesi', 'mineral_deposit', 'İzmir', 'Seferihisar / Gödence',
  'MTA''nın Seferihisar Gödence–Menderes Efemçukuru kıymetli metal araştırmalarında Gödence çevresinde Poyrazoğlu Tepe, Çeşmebeli Sırtı ve Boyalık Tepe mineralizasyonları hedef saha olarak belirlenmiştir. Bu marker bölgesel gösterim amaçlıdır ve tek bir damar veya cevher gövdesinin kesin koordinatını ifade etmez.',
  'high', 38.270590, 26.918940, 'documented',
  'MTA Rapor No 9909 — Gödence–Efemçukuru Altın Yatağı Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=9909&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Gödence Altın Mineralizasyon Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Doğanbey–Kavakdere Jeotermal Alanı', 'geothermal', 'İzmir', 'Seferihisar / Doğanbey–Kavakdere',
  'MTA tarafından Doğanbey ve Kavakdere jeotermal kaynak arama ruhsatlarında jeoloji, hidrojeoloji, hidrojeokimya, jeofizik ve araştırma sondajı çalışmaları yürütülmüştür. Kayıt belgelenmiş hidrotermal sistemi gösterir; tek başına altın mineralizasyonu kanıtı değildir. Koordinat bölgesel gösterim amaçlıdır.',
  'medium', 38.085900, 26.868020, 'documented',
  'MTA Rapor No 13704 — Doğanbey ve Kavakdere Jeotermal Etüt ve Sondajı',
  'https://eticaret.mta.gov.tr/index.php?product_id=36784&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Doğanbey–Kavakdere Jeotermal Alanı'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Cumalı–Tuzla Jeotermal Alanı', 'geothermal', 'İzmir', 'Seferihisar / Cumalı–Tuzla',
  'Seferihisar Cumalı–Tuzla çevresi MTA tarafından jeotermal enerji arama ve sondaj çalışmalarıyla incelenmiş belgelenmiş bir hidrotermal alandır. Bu katman hidrotermal aktiviteyi jeolojik gösterge olarak sunar; doğrudan altın varlığı anlamına gelmez. Marker bölgeseldir.',
  'medium', 38.145660, 26.893390, 'documented',
  'MTA — Seferihisar Cumalı-1 Jeotermal Enerji Arama Kuyusu',
  'https://eticaret.mta.gov.tr/index.php?product_id=8146&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Cumalı–Tuzla Jeotermal Alanı'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Balçova Jeotermal Sahası', 'geothermal', 'İzmir', 'Balçova',
  'Balçova sahasında MTA tarafından jeolojik, jeofizik ve jeokimyasal çalışmalar ile çok sayıda sondaj gerçekleştirilmiş; sıcak su ve buhar üretimiyle önemli bir jeotermal sistem belgelenmiştir. Jeotermal sistem hidrotermal aktivite göstergesidir; bu kayıt doğrudan altın cevherleşmesi iddiası taşımaz.',
  'medium', 38.392600, 27.028800, 'documented',
  'MTA Rapor No 7504 — Balçova Jeotermal Sahası Değerlendirme Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=7504&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Balçova Jeotermal Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Dikili–Bademli Jeotermal Sahası', 'geothermal', 'İzmir', 'Dikili / Bademli',
  'MTA''nın Bademli sahasında gerçekleştirdiği İDB-1 ve İDB-2 araştırma sondajlarında sıcak jeotermal akışkan elde edilmiştir. Sahada genç fay sistemleri, volkanik birimler ve sıcak su kaynakları birlikte belgelenmiştir. Bu kayıt hidrotermal sistem göstergesidir; doğrudan altın kanıtı değildir. Marker bölgeseldir.',
  'medium', 39.038830, 26.825360, 'documented',
  'MTA Rapor No 14082 — Dikili Bademli İDB-1 ve İDB-2 Sondajları',
  'https://eticaret.mta.gov.tr/index.php?product_id=37018&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Dikili–Bademli Jeotermal Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Urla Jeotermal Araştırma Bölgesi', 'geothermal', 'İzmir', 'Urla',
  'Urla–Seferihisar kuşağı MTA tarafından jeotermal enerji açısından jeolojik ve jeofizik yöntemlerle araştırılmıştır. Kayıt bölgesel hidrotermal/tektonik göstergeleri temsil eder; doğrudan altın mineralizasyonu kanıtı değildir.',
  'medium', 38.322000, 26.764000, 'documented',
  'MTA — İzmir Urla Jeotermal Araştırma Sahası Jeoloji Çalışmaları',
  'https://eticaret.mta.gov.tr/index.php?route=product%2Fsearch&tag=%C4%B0ZM%C4%B0R+JEOTERMAL'
where not exists (
  select 1 from public.geological_zones where title = 'Urla Jeotermal Araştırma Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Aliağa Jeotermal Araştırma Bölgesi', 'geothermal', 'İzmir', 'Aliağa',
  'Aliağa çevresi MTA tarafından jeoloji, gravite, manyetik, rezistivite ve diğer jeofizik yöntemlerle jeotermal enerji potansiyeli açısından araştırılmıştır. Bu kayıt belgelenmiş jeotermal araştırma bölgesini gösterir; doğrudan altın cevherleşmesi iddiası değildir.',
  'medium', 38.799000, 26.972000, 'documented',
  'MTA — Aliağa Jeotermal Enerji Araştırmaları',
  'https://eticaret.mta.gov.tr/index.php?route=product%2Fsearch&tag=%C4%B0ZM%C4%B0R+JEOTERMAL'
where not exists (
  select 1 from public.geological_zones where title = 'Aliağa Jeotermal Araştırma Bölgesi'
);

-- Eski geological_zones kayıtlarını kaynaklı veri standardına çekme

update public.geological_zones
set
  potential_level = 'high',
  evidence_level = 'documented',
  description = 'Yamanlar Volkanitleri ve Arapdağ–Altıntepe çevresinde dasitik ve silisifiye dasitik birimler içinde altın-gümüş cevherleşmeleri MTA çalışmalarında belgelenmiştir. Altıntepe ve Çilektepe sektörlerinde sondaj, yüzey ve yeraltı jeoloji çalışmaları yapılmış; cevherleşmenin dasitik birimlerle ilişkisi ortaya konmuştur. Bu marker bölgesel gösterim amaçlıdır.',
  source_name = 'MTA — İzmir-Karşıyaka-Arapdağ Altın Cevherleşmeleri Analiz Raporları',
  source_url = 'https://eticaret.mta.gov.tr/index.php?product_id=8978&route=product%2Fproduct'
where title = 'Yamanlar Kütlesi Epitermal Kuvarsit Hattı';

update public.geological_zones
set
  potential_level = 'high',
  evidence_level = 'documented',
  description = 'Sartmustafa–Salihli çevresindeki Neojen ve Kuvaterner çökellerde sedimanter/plaser altın MTA çalışmalarında belgelenmiştir. Bölgesel çalışmalar ayrıca Gediz grabeninin güney kanadı boyunca gelişen epitermal sistemlerde yer yer altın değerleri saptandığını ve bu sistemlerin Sart plaser altınının olası kaynaklarından biri olabileceğini değerlendirmektedir. Marker bölgesel jeolojik gösterim amaçlıdır.',
  source_name = 'MTA Rapor No 5973 ve 9532 — Sartmustafa Plaserleri ve Salihli Altın Prospeksiyonu',
  source_url = 'https://eticaret.mta.gov.tr/index.php?product_id=5973&route=product%2Fproduct'
where title = 'Salihli - Sart Havzası Jeolojik Gösterge';

update public.geological_zones
set
  potential_level = 'medium',
  evidence_level = 'documented',
  description = 'Seferihisar–Menderes kuşağında MTA tarafından jeolojik, jeofizik ve jeotermal araştırmalar ile sondaj çalışmaları yürütülmüştür. Cumaovası Volkanitleri ve ilişkili yapısal zonlar bölgesel hidrotermal-jeotermal sistemin parçaları olarak değerlendirilmiştir. Bu kayıt hidrotermal aktiviteyi gösterir; tek başına altın mineralizasyonu kanıtı değildir.',
  source_name = 'MTA Rapor No 11734 — Akyar-Ilıkpınar Seferihisar-Menderes Jeotermal Etüt ve Sondajı',
  source_url = 'https://eticaret.mta.gov.tr/index.php?product_id=11682&route=product%2Fproduct'
where title = 'Menderes Graben / Jeotermal Hat';

-- Batı Anadolu veri paketi 1 (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Sart Plaser Altın Yatağı', 'placer', 'Manisa', 'Salihli / Sart',
  'MTA çalışmalarında Sart çevresindeki Pliyo-Kuvaterner yaşlı kırıntılı çökeller içinde plaser altın oluşumu belgelenmiştir. Teknolojik ve ön değerlendirme çalışmalarında kum-çakıl birimleri içinde altın taneleri incelenmiştir. Bu kayıt doğrudan belgelenmiş plaser oluşumunu gösterir; marker bölgesel gösterim amaçlıdır.',
  'high', 38.4836, 28.0355, 'documented',
  'MTA Rapor No 6961 — Sart Plaser Altın Yatağı Ön Değerlendirme Etüdü',
  'https://eticaret.mta.gov.tr/index.php?product_id=6961&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Sart Plaser Altın Yatağı'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Uşak–Eşme Altın Arama Bölgesi', 'mineral_deposit', 'Uşak', 'Eşme',
  'MTA kayıtlarında Uşak-Eşme ve Manisa-Kula çevresinde altın arama ve maden jeolojisi çalışmaları yürütülmüştür. Bu marker bölgesel arama/cevherleşme alanını gösterir; tek bir cevher gövdesinin kesin sınırı değildir.',
  'high', 38.3990, 28.9690, 'documented',
  'MTA — Uşak-Eşme, Manisa-Kula Altın Aramaları Maden Jeolojisi Raporu',
  'https://eticaret.mta.gov.tr/index.php?route=product%2Fsearch&tag=ALTIN'
where not exists (
  select 1 from public.geological_zones where title = 'Uşak–Eşme Altın Arama Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Havran–Küçükdere Altın Bölgesi', 'mineral_deposit', 'Balıkesir', 'Havran / Küçükdere',
  'MTA''nın Türkiye altın yatakları değerlendirmelerinde Havran-Küçükdere önemli altın yataklarından biri olarak yer almaktadır. Bu kayıt belgelenmiş altın cevherleşme bölgesini gösterir ve marker bölgesel konumdadır.',
  'high', 39.5580, 27.0400, 'documented',
  'MTA — Türkiye Altın Yatakları / Havran-Küçükdere',
  'https://bulten.mta.gov.tr/dosyalar/makaleler/272/tr_20221018104719_272_4_cae74480.pdf'
where not exists (
  select 1 from public.geological_zones where title = 'Havran–Küçükdere Altın Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Tuzla–Ayvacık Altın Cevherleşmesi', 'quartz_vein', 'Çanakkale', 'Ayvacık / Tuzla',
  'MTA çalışmalarında Tuzla–Naldöken çevresinde hidrotermal alterasyon, silisleşme ve Au anomalileri belgelenmiştir. Bate incelemelerinde altın taneleri görülmüş, kimyasal analizlerde Au değerleri elde edilmiştir. Saha epitermal altın modeli açısından araştırılmıştır; ekonomik yatak bulunduğu anlamına gelmez.',
  'medium', 39.5510, 26.1700, 'documented',
  'MTA Rapor No 9892 — Tuzla (Çanakkale-Ayvacık) Au Cevherleşmesi Etüt Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=9892&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Tuzla–Ayvacık Altın Cevherleşmesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Tepeoba–Havran Au-Mo-Cu Cevherleşme Bölgesi', 'mineral_deposit', 'Balıkesir', 'Havran / Tepeoba',
  'MTA tarafından Tepeoba sahasında Au, Mo ve Cu cevherleşmelerine yönelik jeolojik çalışmalar yürütülmüştür. Bu marker belgelenmiş mineralizasyon alanını bölgesel olarak gösterir.',
  'medium', 39.5900, 26.9300, 'documented',
  'MTA — Tepeoba (Balıkesir-Havran) Au-Mo-Cu Cevherleşmesi Etüt Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=100&page=3&route=product%2Fsearch&tag=89'
where not exists (
  select 1 from public.geological_zones where title = 'Tepeoba–Havran Au-Mo-Cu Cevherleşme Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Kemerdere–Ezine Altın Cevherleşme Bölgesi', 'quartz_vein', 'Çanakkale', 'Ezine / Kemerdere',
  'Biga Yarımadası Ağır Mineral Projesi kapsamında Kemerdere sahasında altın cevherleşmesine yönelik jeolojik ve jeokimyasal çalışmalar yapılmıştır. Kayıt bölgesel araştırma sahasını gösterir; ekonomik yatak iddiası taşımaz.',
  'medium', 39.7600, 26.3200, 'documented',
  'MTA — Kemerdere (Çanakkale-Ezine) Altın Cevherleşmesi Etüt Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=100&page=5&route=product%2Fsearch&tag=%C3%87ANAKKALE'
where not exists (
  select 1 from public.geological_zones where title = 'Kemerdere–Ezine Altın Cevherleşme Bölgesi'
);

-- Batı Anadolu veri paketi 2 (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Karakışla Altın-Skarn Cevherleşme Bölgesi', 'mineral_deposit', 'Çanakkale', 'Ezine / Karakışla',
  'MTA''nın Biga Yarımadası Ağır Mineral Projesi kapsamında Karakışla sahasında granodiyorit-mermer dokanağındaki skarn zonunda Au, Fe, Pb, Zn ve Cu cevherleşmeleri incelenmiştir. Toprak bate örneklerinde yüksek sayıda altın tanesi gözlenmiş, ancak saha önemli ekonomik rezerv içermediği şeklinde değerlendirilmiştir. Marker bölgesel gösterim amaçlıdır.',
  'medium', 39.6700, 26.1900, 'documented',
  'MTA Rapor No 9890 — Karakışla (Çanakkale-Ezine) Altın ve Baz Metal Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=9890&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Karakışla Altın-Skarn Cevherleşme Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Çakır–Yenice Altın Gösterge Bölgesi', 'quartz_vein', 'Çanakkale', 'Yenice / Çakır',
  'MTA çalışmalarında Çakır sahasındaki limonitik ve hidrotermal alterasyon zonlarında altın taneleri gözlenmiş, dere sedimanı ve bate örnekleri incelenmiştir. Altının skarn veya hidrotermal sistemle ilişkisi kesin olarak belirlenememiş; sahanın ekonomik potansiyelinin anlaşılması için ilave detay çalışmalar önerilmiştir. Bu kayıt jeolojik gösterge niteliğindedir.',
  'medium', 39.9000, 27.2000, 'documented',
  'MTA Rapor No 9891 — Çakır (Çanakkale-Yenice) Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=9891&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Çakır–Yenice Altın Gösterge Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Avcılar–Altınoluk Epitermal Altın Bölgesi', 'quartz_vein', 'Balıkesir', 'Edremit / Altınoluk / Avcılar',
  'MTA tarafından Avcılar sahasında yapılan detay jeoloji, dere sedimanı, toprak bate ve kaya analizlerinde altın taneleri ve Au anomalileri belirlenmiştir. Andezitik volkanik kayaçlar içindeki epitermal altın cevherleşmesinin daha ayrıntılı araştırılması gerektiği değerlendirilmiştir. Marker bölgesel gösterim amaçlıdır.',
  'medium', 39.5700, 26.7200, 'documented',
  'MTA Rapor No 9895 — Avcılar (Balıkesir-Edremit-Altınoluk) Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=9895&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Avcılar–Altınoluk Epitermal Altın Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Bileklikyayla–Domaniç Altın Cevherleşme Bölgesi', 'mineral_deposit', 'Kütahya', 'Domaniç / Bileklikyayla',
  'MTA çalışmalarında Bileklikyayla çevresindeki skarn zonlarında yer yer altın içeren mineralizasyonlar ile yüksek Cu-Pb-Zn değerleri belirlenmiştir. Bulgular yakın çevrede örtülü veya gömülü porfiri sistem olasılığını desteklemiştir. Bu kayıt belgelenmiş mineralizasyon bölgesini gösterir; ekonomik yatak iddiası taşımaz.',
  'medium', 39.8000, 29.6200, 'documented',
  'MTA Rapor No 10491 — Bileklikyayla (Domaniç-Kütahya) Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=10491&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Bileklikyayla–Domaniç Altın Cevherleşme Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Helimli–Eşme Arsenopiritli Altın Bölgesi', 'mineral_deposit', 'Uşak', 'Eşme / Helimli–Dervişli',
  'MTA''nın Uşak-Eşme ve Manisa-Kula altın aramalarında arsenopiritli damar ve merceklerde altın değerleri belirlenmiştir. Analizlerde yer yer yüksek Au tenörleri saptanmış ancak damarların küçük ve düzensiz oluşu nedeniyle ekonomik rezerv açısından sınırlı değerlendirilmiştir. Bu marker bölgesel cevherleşme alanını gösterir.',
  'medium', 38.4200, 28.9500, 'documented',
  'MTA Rapor No 9520 — Uşak-Eşme, Manisa-Kula Altın Aramaları',
  'https://eticaret.mta.gov.tr/index.php?product_id=9520&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Helimli–Eşme Arsenopiritli Altın Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Kula–Aydınlı Arsenopiritli Altın Damarları', 'quartz_vein', 'Manisa', 'Kula / Aydınlı–Hıdırlar',
  'MTA çalışmalarında Kula-Aydınlı-Hıdırlar çevresinde arsenopirit damarları tespit edilmiş ve alınan cevher örneklerinde altın değerleri ölçülmüştür. Damarların küçük ve süreksiz olması nedeniyle ekonomik rezerv oluşturmadığı değerlendirilmiştir. Bu kayıt belgelenmiş altınlı damar sistemini bölgesel olarak gösterir.',
  'medium', 38.5500, 28.6500, 'documented',
  'MTA Rapor No 9520 — Uşak-Eşme, Manisa-Kula Altın Aramaları',
  'https://eticaret.mta.gov.tr/index.php?product_id=9520&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Kula–Aydınlı Arsenopiritli Altın Damarları'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Dombaycılar–Bayramiç Altın Araştırma Bölgesi', 'quartz_vein', 'Çanakkale', 'Bayramiç / Dombaycılar',
  'MTA''nın Biga Yarımadası Ağır Mineral Projesi kapsamında Dombaycılar sahasında altın cevherleşmesine yönelik jeolojik ve jeokimyasal çalışmalar yürütülmüştür. Mevcut örnek sayısı ve veri kalitesi cevherleşmenin niteliğini kesin değerlendirmek için yetersiz bulunmuştur. Bu nedenle kayıt bölgesel araştırma göstergesi olarak değerlendirilmelidir.',
  'low', 39.8200, 26.6000, 'regional_indicator',
  'MTA Rapor No 9894 — Dombaycılar (Çanakkale-Bayramiç) Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=9894&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Dombaycılar–Bayramiç Altın Araştırma Bölgesi'
);

-- İç Anadolu veri paketi 1 (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Bakırtepe–Kangal Altın Sahası', 'quartz_vein', 'Sivas', 'Kangal / Çetinkaya / Bakırtepe',
  'MTA çalışmalarında Bakırtepe çevresindeki metamorfik kayaçların kırık ve çatlaklarında hidrotermal kuvars damarları boyunca altın cevherleşmesi belgelenmiştir. Altın, pirit mineralleri içinde kapanım ve kuvars içinde serbest nabit altın olarak gözlenmiştir. Hematitli-silisli ve breşik damar zonları da altın açısından önemli olarak değerlendirilmiştir. Marker bölgesel gösterim amaçlıdır.',
  'high', 39.1300, 37.2900, 'documented',
  'MTA Rapor No 11168 — Bakırtepe (Çetinkaya-Kangal-Sivas) Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=12050&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Bakırtepe–Kangal Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Savcılıebeyit–Kaman Altınlı Kuvars Damarları', 'quartz_vein', 'Kırşehir', 'Kaman / Savcılıebeyit',
  'MTA çalışmalarında Savcılıebeyit sahasında mermerler içerisinde altınlı süt kuvars damar zonları belirlenmiştir. Kuvars damarlarının derinlik yönündeki altın tenör dağılımının araştırılması için sondaj önerilmiş ve saha için altın buluculuk hakkı alınmıştır. Marker bölgesel konumdadır.',
  'high', 39.3600, 33.7200, 'documented',
  'MTA Rapor No 11451 — Savcılıebeyit (Kaman-Kırşehir) Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=11923&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Savcılıebeyit–Kaman Altınlı Kuvars Damarları'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Bereketli–Çamardı Altın Sahası', 'mineral_deposit', 'Niğde', 'Çamardı / Bereketli',
  'Niğde-Çamardı Bereketli sahası MTA tarafından altın sahası olarak ruhsatlandırılmış, maden jeolojisi ve kaynak tahmin çalışmaları yürütülmüştür. Bu kayıt doğrudan belgelenmiş altın araştırma ve kaynak değerlendirme sahasını bölgesel olarak gösterir.',
  'high', 37.7900, 34.9800, 'documented',
  'MTA Rapor No 13698 — Niğde-Çamardı-Bereketli Altın Sahası Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=20873&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Bereketli–Çamardı Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Sulucadere–Ulukışla Hidrotermal Polimetal Bölgesi', 'quartz_vein', 'Niğde', 'Ulukışla / Sulucadere / Bolkardağ',
  'MTA çalışmalarında Sulucadere çevresinde granodiyorit sokulumu ile ilişkili hidrotermal polimetal cevherleşme belgelenmiştir. Sfalerit, galenit, kalkopirit, molibdenit ve pirit yanında analizlerde altın ve gümüş de saptanmıştır. Gang mineralleri arasında kuvars, kalsit ve dolomit bulunmaktadır. Bu kayıt hidrotermal-polimetal mineralizasyon göstergesidir; ekonomik altın yatağı iddiası taşımaz.',
  'medium', 37.5400, 34.5200, 'documented',
  'MTA Rapor No 7670 — Bolkardağ-Sulucadere Polimetal Cevherleşmesi Etüdü',
  'https://eticaret.mta.gov.tr/index.php?product_id=7670&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Sulucadere–Ulukışla Hidrotermal Polimetal Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Yeşilhisar–Yahyalı Skarn Mineralizasyon Kuşağı', 'mineral_deposit', 'Kayseri', 'Yeşilhisar / Yahyalı',
  'MTA çalışmalarında Yeşilhisar-Yahyalı hattında granitoyitik kayaçlarla karbonatlı birimlerin dokanaklarında skarn tipi cevherleşmeler belgelenmiştir. Manyetit, hematit, pirit ve kalkopirit içeren mineralizasyonlar araştırılmış; proje raporu demir, molibden, kurşun, çinko, bakır ve altın başlıklarını kapsamaktadır. Bu kayıt bölgesel metalojenik gösterge olarak değerlendirilmelidir; doğrudan ekonomik altın yatağı iddiası taşımaz.',
  'low', 38.1000, 35.3500, 'regional_indicator',
  'MTA Rapor No 11753 — Kayseri Yeşilhisar-Yahyalı Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=11670&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Yeşilhisar–Yahyalı Skarn Mineralizasyon Kuşağı'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Niğde Masifi Altın-Kalay Araştırma Bölgesi', 'mineral_deposit', 'Niğde', 'Niğde Masifi',
  'MTA kayıtlarında Niğde Masifi altın ve kalay mineralleri açısından araştırılmıştır. Bu kayıt geniş ölçekli bölgesel araştırma alanını temsil eder; tek bir cevher yatağı veya kesin mineralizasyon noktası değildir.',
  'low', 37.9500, 34.6800, 'regional_indicator',
  'MTA — Niğde Masifi Altın-Kalay Mineral Ön Raporu',
  'https://eticaret.mta.gov.tr/index.php?order=ASC&route=product%2Fsearch&sort=p.price&tag=ALTIN+CEVHERLE%C5%9EMES%C4%B0'
where not exists (
  select 1 from public.geological_zones where title = 'Niğde Masifi Altın-Kalay Araştırma Bölgesi'
);

-- Doğu ve Kuzeydoğu Anadolu veri paketi 1 (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Olucak–Gümüşhane Altın Cevherleşmesi', 'quartz_vein', 'Gümüşhane', 'Merkez / Olucak',
  'MTA çalışmalarında Olucak sahasında kırık sistemleri boyunca gelişmiş hidrotermal kıymetli metal cevherleşmesi belgelenmiştir. Cevherleşme kuvars-illit damarları, ağsal damarcıklar ve hidrotermal breşler içinde gelişmektedir. Parajenezde pirit, nabit altın, nabit gümüş ve baz metal sülfürleri tanımlanmıştır. Marker bölgesel gösterim amaçlıdır.',
  'high', 40.4300, 39.4800, 'documented',
  'MTA Rapor No 9789 — Gümüşhane-Olucak Altın Cevherleşme Sahası Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=9789&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Olucak–Gümüşhane Altın Cevherleşmesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Kaletaş Epitermal Altın Sahası', 'mineral_deposit', 'Gümüşhane', 'Merkez / Kaletaş',
  'MTA çalışmalarında Kaletaş sahasında yaklaşık 550 metre boyunca izlenen silisifiye bir cevher zonu belgelenmiştir. Altının çok ince taneli olduğu ve kimyasal analizlerle varlığının doğrulandığı belirtilmiştir. Cevherleşme kırık tektoniği kontrollü epitermal tip kıymetli metal sistemi olarak değerlendirilmiştir.',
  'high', 40.4500, 39.5000, 'documented',
  'MTA Rapor No 10271 — Gümüşhane-Kaletaş Altın Cevherleşmesi',
  'https://eticaret.mta.gov.tr/index.php?product_id=10271&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Kaletaş Epitermal Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Sobran–Arzular Altın Sahası', 'mineral_deposit', 'Gümüşhane', 'Merkez / Arzular',
  'MTA''nın Sobran-Arzular sahasında yürüttüğü detay jeoloji ve sondaj çalışmalarında kıymetli metal cevherleşmesi belgelenmiştir. 19 lokasyonda yapılan sondajlar sonucunda saha için altın rezerv hesabı yapılmış ve altın açısından ekonomik potansiyel taşıdığı değerlendirilmiştir. Marker bölgesel konumdadır.',
  'high', 40.4800, 39.4200, 'documented',
  'MTA Rapor No 11052 — Gümüşhane-Sobran (Arzular) Sahası Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=11701&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Sobran–Arzular Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Kırıntıyayla–Şiran Epitermal Altın Bölgesi', 'quartz_vein', 'Gümüşhane', 'Şiran / Kırıntıyayla',
  'MTA çalışmalarında Kırıntıyayla sahasında dikkate değer altın değerleri, yaygın silisleşme ve hidrotermal alterasyon zonları belirlenmiştir. Cevherleşmenin hidrotermal damar tipi epitermal sistem içinde geliştiği değerlendirilmiştir. Bu kayıt belgelenmiş mineralizasyon bölgesini gösterir; ekonomik yatak iddiası taşımaz.',
  'medium', 40.1900, 39.1000, 'documented',
  'MTA Rapor No 11556 — Gümüşhane-Şiran-Kırıntıyayla Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=11867&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Kırıntıyayla–Şiran Epitermal Altın Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'İliç–Kemaliye Altın Araştırma Kuşağı', 'mineral_deposit', 'Erzincan', 'İliç / Kemaliye',
  'MTA''nın Erzincan-İliç-Kemaliye altın aramalarında Kabataş Subvolkaniti ile Munzur kireçtaşı dokanaklarında jasperoid gelişimleri ve altın zenginleşmeleri belgelenmiştir. Örneklerde yüksek Au değerleri saptanmış ve Carlin tipi düşük sülfürlü kıymetli metal sistemi olasılığı değerlendirilmiştir. Marker geniş bölgesel araştırma alanını gösterir.',
  'high', 39.4500, 38.5600, 'documented',
  'MTA Rapor No 9981 — Erzincan-İliç-Kemaliye Yöresi Altın Aramaları',
  'https://eticaret.mta.gov.tr/index.php?product_id=9981&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'İliç–Kemaliye Altın Araştırma Kuşağı'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Yanıklı–Artvin Polimetalik Au-Ag Bölgesi', 'mineral_deposit', 'Artvin', 'Merkez / Yanıklı',
  'MTA''nın Yanıklı sahasında yürüttüğü maden jeolojisi ve kaynak tahmin çalışmalarında Cu-Pb-Zn-Au-Ag içeren yapısal kontrollü polimetalik mineralizasyon belgelenmiştir. Altın ve gümüş, baz metal cevherleşmeleriyle birlikte damar, damarcık ve dissemine biçimde tanımlanmıştır. Kaynak tahmin çalışması da yapılmıştır. Marker bölgesel gösterim amaçlıdır.',
  'high', 41.1800, 41.8500, 'documented',
  'MTA Rapor No 14694 — Artvin Yanıklı Cu-Pb-Zn-Au-Ag Mineralizasyonları Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=37454&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Yanıklı–Artvin Polimetalik Au-Ag Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Hırdamus–Pazaryolu Altın Arama Bölgesi', 'quartz_vein', 'Erzurum', 'Pazaryolu / Hırdamus',
  'MTA çalışmalarında Hırdamus sahasında hidrotermal alterasyon zonları, silisli yapılar ve Au-metal anomalileri araştırılmıştır. Jeofizik ve jeokimyasal çalışmalar sondaj yapılmasını gerektirecek göstergeler ortaya koymuş, ancak daha sonraki sondajlarda ekonomik altın cevherleşmesini destekleyecek güçlü değerler elde edilememiştir. Bu nedenle kayıt bölgesel araştırma göstergesi olarak değerlendirilmelidir.',
  'low', 40.4100, 40.7700, 'regional_indicator',
  'MTA Rapor No 11270 — Hırdamus (Pazaryolu-Erzurum) Sahası Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=12063&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Hırdamus–Pazaryolu Altın Arama Bölgesi'
);

-- Orta Karadeniz veri paketi 1 (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Sayaca–Ulubey Epitermal Altın Sahası', 'mineral_deposit', 'Ordu', 'Ulubey / Sayaca',
  'MTA çalışmalarında Sayaca sahasında dasitik tüfler içerisinde kırık ve fay kontrollü epitermal altın cevherleşmesi belgelenmiştir. Silisleşmiş zonlarda altın zenginleşmeleri belirlenmiş ve saha için görünür rezerv hesapları yapılmıştır. Marker bölgesel gösterim amaçlıdır.',
  'high', 40.9400, 37.7300, 'documented',
  'MTA Rapor No 8958 ve 8996 — Ordu-Ulubey-Sayaca Altın Sahası',
  'https://eticaret.mta.gov.tr/index.php?product_id=8958&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Sayaca–Ulubey Epitermal Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Akoluk–Ulubey Altın Cevherleşmesi', 'mineral_deposit', 'Ordu', 'Ulubey / Akoluk',
  'MTA tarafından Akoluk sahasında altın cevherleşmesine yönelik jeolojik inceleme, karotlu sondaj ve rezerv değerlendirme çalışmaları yürütülmüştür. Bu kayıt belgelenmiş altın araştırma sahasını gösterir; marker bölgesel konumdadır.',
  'high', 40.9000, 37.6700, 'documented',
  'MTA Rapor No 10934 — Akoluk (Ulubey-Ordu) Altın Cevherleşmesi Jeoloji, Sondaj ve Rezerv Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=10934&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Akoluk–Ulubey Altın Cevherleşmesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Kirazbeli–Fatsa Altın-Gümüş Mineralizasyonu', 'mineral_deposit', 'Ordu', 'Fatsa / Ünye / Kirazbeli',
  'MTA''nın Kirazbeli ruhsat sahasında yürüttüğü prospeksiyon çalışmalarında altın potansiyeli belirlenmiş, ardından karotlu sondajlarla altın cevherleşmesinin derinlik ve devamlılığı araştırılmıştır. Daha sonraki çalışmalar mineralizasyon için kaynak tahminine kadar ilerlemiştir. Marker bölgesel gösterim amaçlıdır.',
  'high', 41.0200, 37.4200, 'documented',
  'MTA — Kirazbeli (Fatsa-Ünye/Ordu) Altın-Gümüş Maden Jeolojisi ve Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=36763&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Kirazbeli–Fatsa Altın-Gümüş Mineralizasyonu'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Ordu Polimetalik-Epitermal Araştırma Kuşağı', 'quartz_vein', 'Ordu', 'Ordu / Gölköy / Kumru / Fatsa hattı',
  'MTA''nın Ordu yöresi polimetal aramalarında Üst Kretase ve Tersiyer yaşlı volkanik-magmatik birimler içinde damar, skarn ve epitermal tip cevherleşmeler belgelenmiştir. Bu kayıt geniş bölgesel metalojenik araştırma kuşağını temsil eder; doğrudan ekonomik altın yatağı iddiası taşımaz.',
  'low', 40.8700, 37.6200, 'regional_indicator',
  'MTA — Ordu Yöresi Polimetal Aramaları Projesi Maden Jeolojisi Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=11665&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Ordu Polimetalik-Epitermal Araştırma Kuşağı'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Alucra–Şiran Polimetalik Araştırma Kuşağı', 'mineral_deposit', 'Giresun', 'Alucra / Şiran sınırı',
  'MTA tarafından Giresun-Alucra ile Gümüşhane-Kelkit-Şiran hattında Cu-Pb-Zn-Fe ve barit cevherleşmelerine yönelik bölgesel maden jeolojisi çalışmaları yürütülmüştür. Bu kayıt geniş ölçekli polimetalik araştırma göstergesidir; doğrudan altın cevherleşmesi kanıtı olarak değerlendirilmemelidir.',
  'low', 40.3200, 38.7600, 'regional_indicator',
  'MTA Rapor No 8040 — Gümüşhane-Kelkit-Şiran ve Giresun-Alucra Cevherleşmeleri',
  'https://eticaret.mta.gov.tr/index.php?product_id=8040&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Alucra–Şiran Polimetalik Araştırma Kuşağı'
);

-- Akdeniz ve Güneydoğu geçiş veri paketi (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Akıllı Çay Plaser Altın Bölgesi', 'placer', 'Hatay', 'Antakya / Akıllı Çay',
  'MTA''nın Hatay altın prospeksiyon çalışmalarında Akıllı Çay''daki eski dere teraslarının tabanında plaser altın zenginleşmeleri belgelenmiştir. Altının büyük ölçüde Miyosen taban konglomeralarından geldiği, bu konglomeralardaki altının ise Kisecik-Bayrakboğaz Dere çevresindeki hidrotermal kuvars damarlı zondan kaynaklanmış olabileceği değerlendirilmiştir. Bu kayıt doğrudan belgelenmiş plaser altın oluşumunu gösterir; marker bölgesel konumdadır.',
  'high', 36.2661, 36.0982, 'documented',
  'MTA Rapor No 7982 — Hatay Altın Aramaları Prospeksiyon Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=7982&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Akıllı Çay Plaser Altın Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Kisecik Hidrotermal Altın Cevherleşme Bölgesi', 'quartz_vein', 'Hatay', 'Antakya / Kisecik / Bayrakboğaz',
  'MTA tarafından Kisecik çevresindeki altın aramalarında diyoritik intrüzyonlarla ilişkili hidrotermal sülfitli damar ve çatlak tipi cevherleşmeler jeofizik yöntemlerle araştırılmıştır. IP, EM-Turam ve SP çalışmalarında iletken cevherleşmeyle ilişkili anomali zonları belirlenmiş ve sondaj önerilmiştir. Bu kayıt primer hidrotermal kaynak sistemi göstergesidir; ekonomik altın yatağı iddiası taşımaz.',
  'medium', 36.2515, 36.0924, 'documented',
  'MTA Rapor No 8860 — Hatay-Antakya-Kisecik Altın Aramaları Jeofizik Etüdü',
  'https://eticaret.mta.gov.tr/index.php?product_id=8860&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Kisecik Hidrotermal Altın Cevherleşme Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Şerefhan–Yeşilyurt Fluoritli Altın Sahası', 'mineral_deposit', 'Malatya', 'Yeşilyurt / Şerefhan / Çelikhan sınırı',
  'MTA''nın kaynak tahmin çalışmalarında Yeşilyurt-Şerefhan sahasında düşük açılı normal ve sıyrılma fay zonları boyunca gelişmiş fluoritli-altın cevherleşmesi belgelenmiştir. Mineralizasyon kataklazit ve breş zonlarında silisleşme ile kuvars-serisit-pirit alterasyonu eşliğinde gelişmektedir. Saha için altın kaynak tahmin çalışmaları yapılmıştır. Marker bölgesel gösterim amaçlıdır.',
  'high', 38.0873, 38.3318, 'documented',
  'MTA — Malatya-Yeşilyurt-Şerefhan Au Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=36890&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Şerefhan–Yeşilyurt Fluoritli Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Boğaçay Alüvyon Altın Araştırma Bölgesi', 'placer', 'Antalya', 'Konyaaltı / Boğaçay',
  'MTA tarafından Boğaçay alüvyonlarında doğrudan altın araştırma çalışmaları yürütülmüş ve saha alüvyal altın potansiyeli açısından incelenmiştir. Bu kayıt araştırma alanını gösterir; rapor başlığı tek başına ekonomik veya sürekli plaser altın yatağı bulunduğu anlamına gelmez. Marker bölgesel konumdadır.',
  'low', 36.8584, 30.6067, 'regional_indicator',
  'MTA Rapor No 10519 — Antalya-Boğaçay Alüvyonlarında Altın Araştırma Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=10519&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Boğaçay Alüvyon Altın Araştırma Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Hamek–Bingöl Altın Prospeksiyon Bölgesi', 'placer', 'Bingöl', 'Hamek',
  'MTA arşivinde Hamek bölgesinde altın ve alüvyon odaklı prospeksiyon çalışması bulunmaktadır. Mevcut açık rapor kaydı sahanın altın açısından araştırıldığını doğrulamaktadır ancak ekonomik cevherleşme veya güçlü kaynak verisi açık özetten doğrulanamadığı için kayıt bölgesel araştırma göstergesi olarak tutulmalıdır.',
  'low', 38.8900, 40.5000, 'regional_indicator',
  'MTA Rapor No 2335 — Hamek Bölgesinin Altın Prospeksiyonu',
  'https://eticaret.mta.gov.tr/index.php?product_id=2335&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Hamek–Bingöl Altın Prospeksiyon Bölgesi'
);

-- Marmara ve Batı Karadeniz veri paketi 1 (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Söğüt Güneyi Altın–Antimuan–Volfram Bölgesi', 'mineral_deposit', 'Bilecik', 'Söğüt / Kışladere–Korudanlık–Haydarbahçesi',
  'MTA''nın Söğüt güneyi çalışmalarında Kışladere, Korudanlık, Haydarbahçesi ve çevresindeki kırık kontrollü cevherleşmelerde altın, antimuan ve volfram mineralizasyonları belgelenmiştir. Ağır mineral örneklerinde çok sayıda altın tanesi görülmüş, jeokimya örneklerinde yer yer yüksek Au değerleri saptanmıştır. Korudanlık mevkisinde antik dönem altın üretimine işaret eden eski ocak, galeri, pasa ve cüruf izleri de raporlanmıştır. Marker bölgesel gösterim amaçlıdır.',
  'high', 40.0200, 30.1800, 'documented',
  'MTA Rapor No 9740 — Söğüt Güneyi Altın-Antimuan-Wolfram Cevherleşmeleri Ön Etüt Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=9740&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Söğüt Güneyi Altın–Antimuan–Volfram Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Mayıslar–Sarıcakaya Porfiri Au-Cu Sahası', 'mineral_deposit', 'Eskişehir', 'Sarıcakaya / Mayıslar',
  'MTA kayıtlarında Mayıslar sahası porfiri Au-Cu sistemi olarak tanımlanmış; saha için jeokimya, jeofizik ve buluculuk çalışmaları yürütülmüştür. Bu kayıt doğrudan belgelenmiş altın-bakır mineralizasyon araştırma sahasını bölgesel olarak gösterir.',
  'high', 40.0500, 30.6800, 'documented',
  'MTA — Eskişehir-Sarıcakaya-Mayıslar Buluculuk Raporu',
  'https://eticaret.mta.gov.tr/index.php?route=product%2Fsearch&tag=MAYISLAR'
where not exists (
  select 1 from public.geological_zones where title = 'Mayıslar–Sarıcakaya Porfiri Au-Cu Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Sarıyer Bakırlı-Pirit-Altın Sahası', 'mineral_deposit', 'İstanbul', 'Sarıyer / Maden Mahallesi',
  'MTA''nın Altın Etüt ve Aramaları Projesi kapsamında Sarıyer''de yürüttüğü çalışmalarda Üst Kretase volkanitleri içinde hidrotermal faaliyetlerle ilişkili altın içeren bakırlı-pirit cevherleşmesi belgelenmiştir. Çalışmalar ekonomik potansiyelin kesinleştirilmesi için ilave jeofizik ve sondaj gerektirdiğini belirtmektedir. Bu nedenle kayıt belgelenmiş cevherleşme sahasıdır ancak ekonomik yatak garantisi değildir.',
  'medium', 41.1800, 29.0500, 'documented',
  'MTA Rapor No 7693 — İstanbul-Sarıyer Bakırlı-Pirit-Altın Sahası Jeoloji Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=7693&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Sarıyer Bakırlı-Pirit-Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Karadere–Kırklareli Cu-Mo-Au Sahası', 'mineral_deposit', 'Kırklareli', 'Merkez / Karadere',
  'MTA''nın Karadere ruhsat sahasında bakır, molibden ve altın mineralizasyonuna yönelik maden jeolojisi ve kaynak tahmin çalışmaları yürütülmüştür. Saha güncel UMREK standartlarına uygun kaynak tahmin raporuyla belgelenmiştir. Bu marker mineralizasyon sahasını bölgesel olarak gösterir.',
  'high', 41.7600, 27.1800, 'documented',
  'MTA — Karadere Kırklareli Cu-Mo-Au UMREK Maden Jeolojisi ve Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?order=DESC&route=product%2Fsearch&sort=p.model&tag=KARADERE'
where not exists (
  select 1 from public.geological_zones where title = 'Karadere–Kırklareli Cu-Mo-Au Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Şaphane–Çiğdemlik Altınlı Kuvars Bölgesi', 'quartz_vein', 'Çorum', 'Oğuzlar / Şaphane–Çiğdemlik',
  'MTA çalışmalarında Şaphane ve Çiğdemlik çevresinde kuvars damar ve damarcıklarıyla ilişkili kıymetli metal mineralizasyonları araştırılmıştır. Toprak ve sondaj örneklerinde yer yer Au değerleri saptanmış, çok sayıda karotlu sondajla silisli ve cevherli zonların devamlılığı kontrol edilmiştir. Bazı sektörlerde potansiyelin zayıf kaldığı belirlenmiş olsa da Çiğdemlik ve Şaphane sektörleri buluculuğa esas alanlar olarak tanımlanmıştır. Marker bölgesel gösterim amaçlıdır.',
  'medium', 40.7500, 34.3800, 'documented',
  'MTA Rapor No 13601 — Şaphane (Eskiköy)-Çiğdemlik (Oğuzlar-Çorum) Maden Jeolojisi Final Raporu',
  'https://eticaret.mta.gov.tr/index.php?order=DESC&product_id=19133&route=product%2Fproduct&sort=pd.name&tag=ALTIN+CEVHERLE%C5%9EMES%C4%B0'
where not exists (
  select 1 from public.geological_zones where title = 'Şaphane–Çiğdemlik Altınlı Kuvars Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'İncesırt–Demirköy Cu-Mo-Au Araştırma Sahası', 'mineral_deposit', 'Kırklareli', 'Demirköy / İncesırt',
  'MTA kayıtlarında Demirköy-İncesırt ruhsat sahasında bakır, molibden ve altın cevherleşmelerine yönelik maden jeolojisi ve kaynak tahmin çalışmaları yürütülmüştür. Saha Istranca metalojenik kuşağındaki belgelenmiş araştırma alanlarından biridir. Marker bölgesel gösterim amaçlıdır.',
  'medium', 41.8200, 27.7600, 'documented',
  'MTA — Kırklareli-Demirköy-İncesırt Cu-Mo-Au Maden Jeolojisi ve Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=25&order=DESC&route=product%2Fsearch&sort=p.price&tag=KIRKLAREL%C4%B0'
where not exists (
  select 1 from public.geological_zones where title = 'İncesırt–Demirköy Cu-Mo-Au Araştırma Sahası'
);

-- Türkiye final veri paketi (geological_zones) — title üzerinden idempotent insert

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Terziali Altın Sahası', 'mineral_deposit', 'Kırşehir', 'Merkez / Terziali',
  'MTA tarafından Terziali sahasında detay jeoloji, jeokimya, yarma ve karotlu sondaj çalışmaları yürütülmüştür. Altın mineralizasyonu hematitli, limonitli, killeşmiş, breşik ve silisleşmiş zonlarda belgelenmiş; yüzeye yakın bozunma zonlarında yüksek Au değerleri saptanmıştır. 25 lokasyonda yaklaşık 2970 metre sondaj sonrası saha için altın rezerv hesabı yapılmıştır. Marker bölgesel gösterim amaçlıdır.',
  'high', 39.3000, 34.0500, 'documented',
  'MTA Rapor No 11043 — Terziali (Kırşehir) Altın Cevherleşmesi Maden Jeolojisi',
  'https://eticaret.mta.gov.tr/index.php?product_id=11635&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Terziali Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Ulubel–İspir Au-Cu-Zn-Pb Sahası', 'mineral_deposit', 'Erzurum', 'İspir / Ulubel',
  'MTA tarafından Ulubel-İspir ruhsat sahasında altın, bakır, çinko ve kurşun cevherleşmesine yönelik maden jeolojisi ve kaynak tahmin çalışmaları yürütülmüş ve saha UMREK standartlarında raporlanmıştır. Bu kayıt belgelenmiş çok metalli-altın mineralizasyon sahasını bölgesel olarak gösterir.',
  'high', 40.4244, 40.8759, 'documented',
  'MTA — Ulubel İspir Au-Cu-Zn-Pb UMREK Maden Jeolojisi ve Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=50&order=DESC&route=product%2Fsearch&sort=p.price&tag=CEVHERLESME'
where not exists (
  select 1 from public.geological_zones where title = 'Ulubel–İspir Au-Cu-Zn-Pb Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Elmaalan–Arsin Cu-Au-Zn Sahası', 'mineral_deposit', 'Trabzon', 'Arsin / Elmaalan',
  'MTA kaynak tahmin çalışmalarında Elmaalan sahasında Geç Kretase yaşlı dasitik volkanizmayla ilişkili bakır-altın-çinko cevherleşmesi belgelenmiştir. Mineralizasyon volkanojenik masif sülfür tipi sistem olarak değerlendirilmiştir. Marker bölgesel konumdadır.',
  'high', 40.9116, 39.9402, 'documented',
  'MTA Rapor No 13835 — Trabzon Arsin Elmaalan Cu-Au-Zn Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?product_id=36730&route=product%2Fproduct'
where not exists (
  select 1 from public.geological_zones where title = 'Elmaalan–Arsin Cu-Au-Zn Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Deregözü–Çanakçı Polimetalik Altın Sahası', 'mineral_deposit', 'Giresun', 'Çanakçı / Deregözü',
  'MTA tarafından Giresun-Çanakçı-Deregözü ve Trabzon-Şalpazarı-Gökçeköy hattındaki ruhsat sahasında altın, bakır, molibden, çinko ve kurşun cevherleşmesine yönelik maden jeolojisi ve kaynak tahmin çalışmaları yürütülmüştür. Kayıt belgelenmiş polimetalik-altın araştırma sahasını bölgesel olarak gösterir.',
  'high', 40.8556, 39.0758, 'documented',
  'MTA — Deregözü-Gökçeköy Au-Cu-Mo-Zn-Pb Maden Jeolojisi ve Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=50&route=product%2Fsearch&tag=ALTIN+CEVHERLE%C5%9EMES%C4%B0'
where not exists (
  select 1 from public.geological_zones where title = 'Deregözü–Çanakçı Polimetalik Altın Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Güçlü–Demirözü Altınlı Kuvars Bölgesi', 'quartz_vein', 'Bayburt', 'Demirözü / Güçlü',
  'MTA kayıtlarında Demirözü-Güçlü sahasında kuvars damarlarıyla ilişkili altın cevherleşmesine yönelik maden jeolojisi çalışmaları bulunmaktadır. Bu kayıt belgelenmiş altınlı kuvars araştırma sahasını bölgesel olarak gösterir; ekonomik yatak sınırı değildir.',
  'medium', 40.2500, 39.8500, 'documented',
  'MTA — Güçlü Bayburt-Demirözü Kuvars ve Altın Cevherleşmesi Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=50&route=product%2Fsearch&tag=ALTIN+CEVHERLE%C5%9EMES%C4%B0'
where not exists (
  select 1 from public.geological_zones where title = 'Güçlü–Demirözü Altınlı Kuvars Bölgesi'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Esendal–Yusufeli Cu-Au-Mo Sahası', 'mineral_deposit', 'Artvin', 'Yusufeli / Esendal',
  'MTA tarafından Yusufeli-Esendal ruhsat sahasında bakır-altın-molibden cevherleşmesine yönelik maden jeolojisi ve kaynak tahmin çalışmaları yürütülmüş ve buluculuk talebine esas mineralizasyon belgelenmiştir. Marker bölgesel gösterim amaçlıdır.',
  'high', 40.8200, 41.5200, 'documented',
  'MTA — Yusufeli Esendal Cu-Au-Mo Maden Jeolojisi ve Kaynak Tahmin Raporu',
  'https://eticaret.mta.gov.tr/index.php?limit=25&order=DESC&route=product%2Fsearch&sort=p.model&tag=ALTIN+CEVHERLE%C5%9EMES%C4%B0'
where not exists (
  select 1 from public.geological_zones where title = 'Esendal–Yusufeli Cu-Au-Mo Sahası'
);

insert into public.geological_zones (
  title, zone_type, city, region, description, potential_level,
  latitude, longitude, evidence_level, source_name, source_url
)
select
  'Yellikıran–Kağızman Altın Bölgesi', 'mineral_deposit', 'Kars', 'Kağızman / Yellikıran',
  'MTA kayıtlarında Kağızman-Yellikıran yöresinden alınmış altın cevheri üzerinde gravimetrik zenginleştirme çalışmaları bulunmaktadır. Bu durum bölgede altın cevheri örneklerinin belgelenmiş olduğunu gösterir; ancak açık kaynak özeti ekonomik rezerv veya saha sınırı vermediğinden kayıt bölgesel gösterge olarak tutulmalıdır.',
  'medium', 40.1500, 43.1500, 'regional_indicator',
  'MTA — Kars-Kağızman Altın Cevherinin Gravimetrik Yöntemle Zenginleştirilmesi',
  'https://eticaret.mta.gov.tr/index.php?limit=100&order=ASC&route=product%2Fsearch&sort=pd.name&tag=ALTIN'
where not exists (
  select 1 from public.geological_zones where title = 'Yellikıran–Kağızman Altın Bölgesi'
);
