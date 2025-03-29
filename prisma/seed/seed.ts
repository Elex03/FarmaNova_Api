import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear Formas Farmacéuticas
  const formasFarmaceuticas = await prisma.formaFarmaceutica.createMany({
    data: [
      { nombre: 'Tableta' },
      { nombre: 'Jarabe' },
      { nombre: 'Crema' },
      { nombre: 'Pomada' },
      { nombre: 'Suero' },
      { nombre: 'Inhalador' },
    ],
  });

  console.log('Formas Farmacéuticas creadas:', formasFarmaceuticas);

  // Crear Presentaciones
  const presentaciones = await prisma.presentacion.createMany({
    data: [
      { nombre: 'Caja' },
      { nombre: 'Frasco' },
      { nombre: 'Pote' },
      { nombre: 'Blister' },
      { nombre: 'Sobre' },
      { nombre: 'Ampolla' },
    ],
  });

  console.log('Presentaciones creadas:', presentaciones);

  // Crear Acciones Terapéuticas
  const accionesTerapeuticas = await prisma.accionTerapeutica.createMany({
    data: [
      { nombre: 'Antibiótico' },
      { nombre: 'Analgesico' },
      { nombre: 'Antiinflamatorio' },
      { nombre: 'Antihistamínico' },
      { nombre: 'Antidepresivo' },
      { nombre: 'Antipsicótico' },
      { nombre: 'Antihipertensivo' },
      { nombre: 'Antidiabético' },
    ],
  });

  console.log('Acciones Terapéuticas creadas:', accionesTerapeuticas);

  // Crear Categorías
  const categorias = await prisma.categoria.createMany({
    data: [
      { descripcion: 'Antibióticos' },
      { descripcion: 'Analgésicos' },
      { descripcion: 'Antiácidos' },
      { descripcion: 'Antiinflamatorios' },
      { descripcion: 'Psicofármacos' },
      { descripcion: 'Endocrinología' },
      { descripcion: 'Antihipertensivos' },
      { descripcion: 'Antidiabéticos' },
    ],
  });

  console.log('Categorías creadas:', categorias);


}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });