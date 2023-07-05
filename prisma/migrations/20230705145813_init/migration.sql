-- CreateTable
CREATE TABLE "Depatment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Depatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "birthday" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
