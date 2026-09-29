-- Initial production schema for Hurghada Journeys.
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "category" TEXT NOT NULL,
    "categoryLabel" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eyebrow" TEXT,
    "shortDescription" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "priceFrom" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "priceMode" TEXT NOT NULL DEFAULT 'live',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 100,
    "heroImage" TEXT,
    "gallery" JSONB,
    "highlights" JSONB,
    "itinerary" JSONB,
    "included" JSONB,
    "excluded" JSONB,
    "whatToBring" JSONB,
    "whatsappMessage" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TripTranslation" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "eyebrow" TEXT,
    "shortDescription" TEXT NOT NULL,
    "duration" TEXT,
    "gallery" JSONB,
    "highlights" JSONB,
    "itinerary" JSONB,
    "included" JSONB,
    "excluded" JSONB,
    "whatToBring" JSONB,
    "whatsappMessage" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isReviewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TripTranslation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "hotelName" TEXT,
    "roomNumber" TEXT,
    "tripSlug" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BookingRequest" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "tripSlug" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL DEFAULT 0,
    "hotelName" TEXT NOT NULL,
    "roomNumber" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "country" TEXT,
    "specialRequest" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "websiteName" TEXT NOT NULL DEFAULT 'Hurghada Journeys',
    "tagline" TEXT NOT NULL DEFAULT 'Egypt starts here.',
    "logoPath" TEXT NOT NULL DEFAULT '/brand/logo-mark.svg',
    "whatsappNumber" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "defaultLanguage" TEXT NOT NULL DEFAULT 'en',
    "facebook" TEXT,
    "instagram" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sessionVersion" INTEGER NOT NULL DEFAULT 0,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "name" TEXT NOT NULL,
    "country" TEXT,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "tripSlug" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RateLimitBucket" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "resetAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

CREATE UNIQUE INDEX "Trip_slug_key" ON "Trip"("slug");
CREATE INDEX "Trip_status_sortOrder_idx" ON "Trip"("status", "sortOrder");
CREATE INDEX "Trip_category_status_idx" ON "Trip"("category", "status");
CREATE UNIQUE INDEX "TripTranslation_tripId_locale_key" ON "TripTranslation"("tripId", "locale");
CREATE INDEX "TripTranslation_locale_idx" ON "TripTranslation"("locale");
CREATE INDEX "TripTranslation_tripId_locale_idx" ON "TripTranslation"("tripId", "locale");
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");
CREATE INDEX "ContactMessage_tripSlug_idx" ON "ContactMessage"("tripSlug");
CREATE INDEX "BookingRequest_status_createdAt_idx" ON "BookingRequest"("status", "createdAt");
CREATE INDEX "BookingRequest_tripSlug_preferredDate_idx" ON "BookingRequest"("tripSlug", "preferredDate");
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
CREATE UNIQUE INDEX "MediaAsset_path_key" ON "MediaAsset"("path");
CREATE INDEX "MediaAsset_active_createdAt_idx" ON "MediaAsset"("active", "createdAt");
CREATE INDEX "Review_status_sortOrder_idx" ON "Review"("status", "sortOrder");
CREATE INDEX "Review_tripSlug_idx" ON "Review"("tripSlug");
CREATE INDEX "RateLimitBucket_resetAt_idx" ON "RateLimitBucket"("resetAt");
ALTER TABLE "TripTranslation" ADD CONSTRAINT "TripTranslation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
