-- Create products table (Regional items)
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  image_url text,
  region text not null, -- e.g., 'Hokkaido', 'Tokyo', 'Osaka', 'Fukuoka', 'Okinawa'
  store text not null, -- e.g., 'Seven Eleven', 'Lawson', 'Souvenir Shop'
  category text, -- e.g., 'Snack', 'Beverage', 'Goods'
  description text,
  source_link text,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create donki_products table (Don Quijote ranking items)
create table if not exists donki_products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  image_url text,
  rank integer not null, -- 1 to 100
  category text not null, -- e.g., 'Medicine', 'Cosmetics', 'Snacks', 'Electronics'
  description text,
  is_tax_free boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table products enable row level security;
alter table donki_products enable row level security;

-- Create policies for public read access
create policy "Enable read access for all users" on products
  for select using (true);

create policy "Enable read access for all users" on donki_products
  for select using (true);

-- Create policies for service role (admin/scraper) write access
-- Note: Service role bypasses RLS, but explicit policies can be good for clarity if we ever add authenticated admin users.
-- For now, we rely on service role key for writing.

-- Create indexes for performance
create index if not exists idx_products_region on products(region);
create index if not exists idx_products_category on products(category);
create index if not exists idx_donki_products_rank on donki_products(rank);
create index if not exists idx_donki_products_category on donki_products(category);
