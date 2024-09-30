-- CreateTable
CREATE TABLE "language" (
    "id" SMALLSERIAL NOT NULL,
    "name" CHAR(2) NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "original_content" TEXT NOT NULL,
    "original_language_id" SMALLINT NOT NULL,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_translation" (
    "id" SMALLSERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "page_id" SMALLINT NOT NULL,
    "language_id" SMALLINT NOT NULL,

    CONSTRAINT "page_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SMALLSERIAL NOT NULL,
    "original_content" TEXT NOT NULL,
    "original_language_id" SMALLINT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_translation" (
    "id" SMALLSERIAL NOT NULL,
    "page_id" SMALLINT NOT NULL,
    "language_id" SMALLINT NOT NULL,

    CONSTRAINT "post_translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_name_key" ON "language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "page_name_key" ON "page"("name");

-- CreateIndex
CREATE UNIQUE INDEX "page_translation_page_id_language_id_key" ON "page_translation"("page_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_translation_page_id_language_id_key" ON "post_translation"("page_id", "language_id");

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_original_language_id_fkey" FOREIGN KEY ("original_language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_translation" ADD CONSTRAINT "page_translation_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_translation" ADD CONSTRAINT "page_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_original_language_id_fkey" FOREIGN KEY ("original_language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_translation" ADD CONSTRAINT "post_translation_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_translation" ADD CONSTRAINT "post_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
