import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const { data, error } = await supabase.from("leads").insert([form]);
    if (error) {
      setError("Hubo un error al enviar el formulario.");
      setLoading(false);
    } else {
      setSuccess(true);
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        mensaje: "",
      });
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-white/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-expery-head mb-6">
              Inicia tu viaje
            </h2>
            <p className="text-xl text-black mb-8">
              Somos embajadores del detalle, nos apasiona la atención y el buen
              servicio a cada instante, nos dirigimos a empresarios, directivos,
              gerentes o personas con un gusto increíble del lujo en cada
              estancia.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-expery-blue rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    +1 (555) 123-CRUISE
                  </p>
                  <p className="text-black">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-expery-blue rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    concierge@oceania-elite.com
                  </p>
                  <p className="text-black">Luxury Travel Specialists</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-expery-blue rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Miami Beach, Florida
                  </p>
                  <p className="text-black">Headquarters & Marina</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-expery-blue p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-6">
              Información de Contacto
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg placeholder-gray-300 focus:outline-none"
                />
                <input
                  name="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg placeholder-gray-300 focus:outline-none"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg placeholder-gray-300 focus:outline-none"
              />
              <input
                name="celular"
                type="tel"
                placeholder="Celular"
                value={form.celular}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg placeholder-gray-300 focus:outline-none"
              />
              <textarea
                name="mensaje"
                placeholder="Cuéntanos sobre tu viaje soñado..."
                rows={4}
                value={form.mensaje}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg placeholder-gray-300 focus:outline-none resize-none"
              ></textarea>
              <Button
                type="submit"
                className="w-full border border-solid border-white bg-transparent hover:border-none hover:bg-expery-regent text-white font-semibold py-3"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
              {success && (
                <p className="text-green-500 mt-2">
                  ¡Formulario enviado correctamente!
                </p>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
