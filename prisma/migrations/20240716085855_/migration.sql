-- CreateTable
CREATE TABLE "queue" (
    "element_identifier" UUID NOT NULL,
    "time_inserted" DATE,
    "payload" JSON,

    CONSTRAINT "queue_pkey" PRIMARY KEY ("element_identifier")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "queue_time_inserted_idx" ON "queue"("time_inserted" ASC);
