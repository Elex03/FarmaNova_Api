-- CreateTable
CREATE TABLE "sintomas" (
    "sintoma_pk" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "sintomas_pkey" PRIMARY KEY ("sintoma_pk")
);

-- CreateTable
CREATE TABLE "medicamentoSintoma" (
    "medicaSintoma" SERIAL NOT NULL,
    "medicamento_fk" INTEGER NOT NULL,
    "sintomas_fk" INTEGER NOT NULL,

    CONSTRAINT "medicamentoSintoma_pkey" PRIMARY KEY ("medicaSintoma")
);

-- AddForeignKey
ALTER TABLE "medicamentoSintoma" ADD CONSTRAINT "medicamentoSintoma_sintomas_fk_fkey" FOREIGN KEY ("sintomas_fk") REFERENCES "sintomas"("sintoma_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicamentoSintoma" ADD CONSTRAINT "medicamentoSintoma_medicamento_fk_fkey" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamento"("medicamento_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
