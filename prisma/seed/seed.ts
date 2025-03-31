import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear Presentaciones
  // const presentaciones = await prisma.presentacion.createMany({
  //   data: [
  //     { nombre: 'Caja' },
  //     { nombre: 'Frasco' },
  //     { nombre: 'Pote' },
  //     { nombre: 'Blister' },
  //     { nombre: 'Sobre' },
  //     { nombre: 'Ampolla' },
  //   ],
  // });

  // console.log('Presentaciones creadas:', presentaciones);
  const formaFarmaceutica = await prisma.formaFarmaceutica.createMany({
    data: [
      { nombre: "Tableta" },
      { nombre: "Cápsula" },
      { nombre: "Jarabe" },
      { nombre: "Suspensión" },
      { nombre: "Crema" },
      { nombre: "Pomada" },
      { nombre: "Ungüento" },
      { nombre: "Inyección" },
      { nombre: "Ampolla" },
      { nombre: "Spray" },
      { nombre: "Supositorio" },
      { nombre: "Gel" },
      { nombre: "Parches" },
      { nombre: "Tableta efervescente" },
      { nombre: "Polvo" },
      { nombre: "Láminas" },
    ],
  });
  console.log('Formas creadas', formaFarmaceutica)
  // Crear Categorías
  const categorias = await prisma.accionTera.createMany({
    data: [
      { descripcion: "Antibióticos" },
      { descripcion: "Analgésicos" },
      { descripcion: "Antiácidos" },
      { descripcion: "Antiinflamatorios" },
      { descripcion: "Psicofármacos" },
      { descripcion: "Endocrinología" },
      { descripcion: "Antihipertensivos" },
      { descripcion: "Antidiabéticos" },
    ],
  });

  console.log("Categorías creadas:", categorias);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
