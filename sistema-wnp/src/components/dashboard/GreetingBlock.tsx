function saudacaoPorHora(hora: number): string {
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

export function GreetingBlock() {
  const agora = new Date();
  const saudacao = saudacaoPorHora(agora.getHours());
  const dataFormatada = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-paper-0">{saudacao}, Guilherme</h1>
      <p className="mt-1 text-sm text-paper-500 capitalize">{dataFormatada} — aqui está o panorama da WNP hoje.</p>
    </div>
  );
}
