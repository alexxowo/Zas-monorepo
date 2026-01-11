import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useForm } from 'react-hook-form';
import type { LoginCredentials } from "~/api/loginService";
import { useLogin } from "~/hooks/useLogin";

export default function Login() {

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginCredentials>();

  const { mutate, isPending, isError, error } = useLogin();

  const onSubmit = (data: LoginCredentials) => {
    mutate(data);
  };

  return (
    <section
      className="
      backdrop-blur-xl     
      p-8 rounded-2xl 
      border border-white/10  
      shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]
      before:pointer-events-none /* Brillo de esquina superior */
    "
    >
      <div className="mx-auto text-center">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Zas
        </h1>
      </div>
      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Usuario</Label>
          <Input placeholder="Usuario"
            {...register("username", { required: true })}
            />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label>Contraseña</Label>
          <Input
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
        </div>
        <Button type="submit">Iniciar sesión</Button>
      </form>
    </section>
  );
}
