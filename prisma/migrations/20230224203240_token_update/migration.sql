-- CreateTable
CREATE TABLE "UserWithToken" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "UserWithToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWithToken_id_key" ON "UserWithToken"("id");
