-- CreateTable
CREATE TABLE "categoriamedicamentos" (
    "catmed_pk" SERIAL NOT NULL,
    "medicamento_fk" INTEGER NOT NULL,
    "categoria_fk" INTEGER NOT NULL,

    CONSTRAINT "categoriamedicamentos_pk" PRIMARY KEY ("catmed_pk")
);

-- CreateTable
CREATE TABLE "cateogoria" (
    "categoria_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "cateogoria_pk" PRIMARY KEY ("categoria_pk")
);

-- CreateTable
CREATE TABLE "cliente" (
    "cliente_pk" SERIAL NOT NULL,
    "nombrecompleto" VARCHAR(50) NOT NULL,
    "telefono" VARCHAR(10) NOT NULL,
    "usuario_fk" INTEGER NOT NULL,

    CONSTRAINT "cliente_pk" PRIMARY KEY ("cliente_pk")
);

-- CreateTable
CREATE TABLE "detallesventa" (
    "detallesventa_pk" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "ventas_fk" INTEGER NOT NULL,
    "medicamentos_fk" INTEGER NOT NULL,

    CONSTRAINT "detallesventa_pk" PRIMARY KEY ("detallesventa_pk")
);

-- CreateTable
CREATE TABLE "distribuidor" (
    "distribuidor_pk" SERIAL NOT NULL,
    "nombrecompleto" VARCHAR(50) NOT NULL,
    "telefono" VARCHAR(10) NOT NULL,

    CONSTRAINT "distribuidor_pk" PRIMARY KEY ("distribuidor_pk")
);

-- CreateTable
CREATE TABLE "distribuidormedicamento" (
    "dismedicamento_pk" SERIAL NOT NULL,
    "fecha_expiracion" DATE NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "medicamento_fk" INTEGER NOT NULL,
    "distribuidor_fk" INTEGER NOT NULL,

    CONSTRAINT "distribuidormedicamento_pk" PRIMARY KEY ("dismedicamento_pk")
);

-- CreateTable
CREATE TABLE "empleado" (
    "empleado_pk" SERIAL NOT NULL,
    "nombrecompleto" VARCHAR(20) NOT NULL,
    "usuario_fk" INTEGER NOT NULL,

    CONSTRAINT "empleado_pk" PRIMARY KEY ("empleado_pk")
);

-- CreateTable
CREATE TABLE "medicamentos" (
    "medicamento_pk" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "precio" REAL,
    "tamaño" VARCHAR(30) NOT NULL,
    "presentacion_fk" INTEGER NOT NULL,

    CONSTRAINT "medicamentos_pk" PRIMARY KEY ("medicamento_pk")
);

-- CreateTable
CREATE TABLE "presentacion" (
    "presentacion_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "presentacion_pk" PRIMARY KEY ("presentacion_pk")
);

-- CreateTable
CREATE TABLE "rol" (
    "rol_pk" SERIAL NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,

    CONSTRAINT "rol_pk" PRIMARY KEY ("rol_pk")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usuario_pk" SERIAL NOT NULL,
    "fechacreacion" DATE NOT NULL,
    "correo" VARCHAR(30) NOT NULL,
    "contraseña" VARCHAR(20) NOT NULL,
    "rol_fk" INTEGER NOT NULL,

    CONSTRAINT "usuario_pk" PRIMARY KEY ("usuario_pk")
);

-- CreateTable
CREATE TABLE "ventas" (
    "ventas_pk" SERIAL NOT NULL,
    "fechaventa" DATE NOT NULL,
    "empleado_fk" INTEGER NOT NULL,
    "cliente_fk" INTEGER NOT NULL,

    CONSTRAINT "ventas_pk" PRIMARY KEY ("ventas_pk")
);

-- AddForeignKey
ALTER TABLE "categoriamedicamentos" ADD CONSTRAINT "categoriamedicamentos_cateogoria_fk" FOREIGN KEY ("categoria_fk") REFERENCES "cateogoria"("categoria_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoriamedicamentos" ADD CONSTRAINT "categoriamedicamentos_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_usuario_fk" FOREIGN KEY ("usuario_fk") REFERENCES "usuario"("usuario_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventa" ADD CONSTRAINT "detallesventa_medicamentos_fk" FOREIGN KEY ("medicamentos_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallesventa" ADD CONSTRAINT "detallesventa_ventas_fk" FOREIGN KEY ("ventas_fk") REFERENCES "ventas"("ventas_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "distribuidormedicamento" ADD CONSTRAINT "distribuidormedicamento_distribuidor_fk" FOREIGN KEY ("distribuidor_fk") REFERENCES "distribuidor"("distribuidor_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "distribuidormedicamento" ADD CONSTRAINT "distribuidormedicamento_medicamentos_fk" FOREIGN KEY ("medicamento_fk") REFERENCES "medicamentos"("medicamento_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "medicamentos" ADD CONSTRAINT "medicamentos_presentacion_fk" FOREIGN KEY ("presentacion_fk") REFERENCES "presentacion"("presentacion_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_fk" FOREIGN KEY ("rol_fk") REFERENCES "rol"("rol_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_cliente_fk" FOREIGN KEY ("cliente_fk") REFERENCES "cliente"("cliente_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ventas" ADD CONSTRAINT "ventas_empleado_fk" FOREIGN KEY ("empleado_fk") REFERENCES "empleado"("empleado_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
