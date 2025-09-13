import { supabase } from '@/utils/supabase/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, last_name, email, message } = req.body;
  const phone = req.body.phone ?? null;

  const { data: lead, error: insertError } = await supabase
    .from('leads')
    .insert([{ name, last_name, email, phone, message }])
    .select()
    .single();

  if (insertError) return res.status(500).json({ error: insertError.message });

  const { data: admin } = await supabase
    .from('admin_users')
    .select('*')
    .limit(1)
    .single();

  await supabase.from('admin_notifications').insert([
    {
      lead_id: lead.id,
      admin_id: admin.id,
      message: `Nuevo cliente interesado: ${name}`,
    },
  ]);

  res.status(200).json({ success: true });
}