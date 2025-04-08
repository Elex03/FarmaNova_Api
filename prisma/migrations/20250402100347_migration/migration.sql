-- CreateTable
CREATE TABLE "Devoluciones" (
    "devoluciones_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(150) NOT NULL,
    "variante_fk" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "devoluciones_pk" PRIMARY KEY ("devoluciones_pk")
);

-- AddForeignKey
ALTER TABLE "Devoluciones" ADD CONSTRAINT "devoluciones_medicamentos_fk" FOREIGN KEY ("variante_fk") REFERENCES "Variante"("variante_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
