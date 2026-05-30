-- STEP 2 — CREATE NEW MIGRATION FILE
ALTER TABLE properties
ADD COLUMN listing_type TEXT;

ALTER TABLE properties
ADD COLUMN property_segment TEXT;

ALTER TABLE properties
ADD COLUMN project_status TEXT;

-- STEP 3 — MAP OLD DATA
UPDATE properties
SET
listing_type = 'MANDATE'
WHERE category = 'mandate';

UPDATE properties
SET
listing_type = 'SALE',
property_segment = 'RESIDENTIAL',
project_status = 'NEW'
WHERE category = 'new-residential';

UPDATE properties
SET
listing_type = 'SALE',
property_segment = 'COMMERCIAL',
project_status = 'NEW'
WHERE category = 'new-commercial';

UPDATE properties
SET
listing_type = 'SALE',
project_status = 'UPCOMING'
WHERE category = 'upcoming';

UPDATE properties
SET
listing_type = 'SALE',
property_segment = 'RESIDENTIAL',
project_status = 'RESALE'
WHERE category = 'resale-residential';

UPDATE properties
SET
listing_type = 'SALE',
property_segment = 'COMMERCIAL',
project_status = 'RESALE'
WHERE category = 'resale-commercial';

UPDATE properties
SET
listing_type = 'RENTAL',
property_segment = 'RESIDENTIAL'
WHERE category = 'rental-residential';

UPDATE properties
SET
listing_type = 'RENTAL',
property_segment = 'COMMERCIAL'
WHERE category = 'rental-commercial';

-- STEP 4 — ADD CONSTRAINTS
ALTER TABLE properties
ALTER COLUMN listing_type SET NOT NULL;

ALTER TABLE properties
ALTER COLUMN property_segment SET NOT NULL;

ALTER TABLE properties
ADD CONSTRAINT listing_type_check
CHECK (
listing_type IN (
'SALE',
'RENTAL',
'MANDATE'
)
);

ALTER TABLE properties
ADD CONSTRAINT property_segment_check
CHECK (
property_segment IN (
'RESIDENTIAL',
'COMMERCIAL'
)
);

ALTER TABLE properties
ADD CONSTRAINT project_status_check
CHECK (
project_status IN (
'NEW',
'RESALE',
'UPCOMING'
)
OR project_status IS NULL
);

-- STEP 5 — ADD INDEXES
CREATE INDEX idx_properties_listing_type
ON properties(listing_type);

CREATE INDEX idx_properties_property_segment
ON properties(property_segment);

CREATE INDEX idx_properties_project_status
ON properties(project_status);

CREATE INDEX idx_properties_combined
ON properties(
listing_type,
property_segment,
project_status
);
