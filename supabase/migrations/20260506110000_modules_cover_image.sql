-- Adiciona suporte a imagem de capa nos módulos
ALTER TABLE modules ADD COLUMN IF NOT EXISTS cover_image_url text;
