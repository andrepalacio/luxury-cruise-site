import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/subapaseClient";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: supabaseError } = await supabase
        .from("leads")
        .insert([
          {
            name: form.name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone,
            description: form.description,
          },
        ]);

      if (supabaseError) {
        throw new Error("Error al guardar los datos en la base de datos");
      }

      const requestBody = {
        from: 'Expery Travel <onboarding@resend.dev>',
        to: 'andres.palacio@utp.edu.co',
        subject: 'Nuevo mensaje de contacto',
        data: form,
      };

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el email');
      }

      setSuccess(true);
      setForm({
        name: '',
        last_name: '',
        email: '',
        phone: '',
        description: '',
      });

    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : 'Hubo un error al procesar tu solicitud. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-expery-blue mb-6 text-center lg:text-left">
              Inicia tu viaje
            </h2>
            <p className="text-xl text-black mb-8 text-center lg:text-left">
              En ExperyTravel creemos que el verdadero lujo reside en la intención, la precisión y el servicio personalizado. Nos dirigimos a personas que buscan no solo viajes, sino experiencias hechas a su medida.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-expery-blue rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    +57 312 2802986
                  </p>
                  <p className="text-gray-600 font-semibold">
                    +57 313 5828640
                  </p>
                  <p className="text-black">Disponible 24/7</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-expery-blue rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    contactanos@experytravel.com
                  </p>
                  <p className="text-black">Contacto Expery Travel</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-expery-blue rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Calle 25 #6-66, Pereira, Risaralda, Colombia
                  </p>
                  <p className="text-black">Oficinas</p>
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
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg placeholder-gray-300 focus:outline-none"
                />
                <input
                  name="last_name"
                  type="text"
                  placeholder="Apellido"
                  value={form.last_name}
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
                name="phone"
                type="tel"
                placeholder="Celular"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg placeholder-gray-300 focus:outline-none"
              />
              <textarea
                name="description"
                placeholder="Cuéntanos sobre tu viaje soñado..."
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg placeholder-gray-300 focus:outline-none resize-none"
              ></textarea>
              <Button
                type="submit"
                className="w-full border border-solid border-white bg-transparent hover:border-none hover:bg-expery-iron text-white font-semibold py-3"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
              {success && (
                <p className="text-white mt-2">
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
