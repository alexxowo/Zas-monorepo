import { Card } from "~/components/ui/card";

export default function Dashboard() {
  return (
    <section>
      <Card className="p-4">
        <h1>Bienvenido, Alexandre.</h1>
      </Card>
      <div className=" mt-2 flex flex-row gap-2">
        <Card className="flex-1 p-2 text-center">
          <h1 className="text-4xl">200</h1>
          <h3 className="text-center">Pedidos recibidos</h3>
        </Card>
        <Card className="flex-1 p-2 text-center">
          <h1 className="text-4xl">12</h1>
          <h3 className="text-center">Pedidos Pendientes</h3>
        </Card>
        <Card className="flex-1 py-4 px-1 text-center">
          <h1 className="text-4xl">4</h1>
          <h3 className="">Pedidos en proceso</h3>
        </Card>
      </div>
    </section>
  );
}
