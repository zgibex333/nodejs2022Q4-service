-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavTrack" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FavTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavArtist" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FavArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavAlbum" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FavAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWithToken" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "UserWithToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavAlbum_id_key" ON "FavAlbum"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserWithToken_id_key" ON "UserWithToken"("id");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavTrack" ADD CONSTRAINT "FavTrack_id_fkey" FOREIGN KEY ("id") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavArtist" ADD CONSTRAINT "FavArtist_id_fkey" FOREIGN KEY ("id") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavAlbum" ADD CONSTRAINT "FavAlbum_id_fkey" FOREIGN KEY ("id") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
