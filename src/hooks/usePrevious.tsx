import { useRef, useEffect } from "react";

export default function usePrevious(value: any) {
  //O objeto ref é um contêiner genérico cuja propriedade current é mutável ...
  //... e pode conter qualquer valor, semelhante a uma propriedade de instância em uma classe
  const ref = useRef<any>(null);
  // Armazena o valor atual na ref
  useEffect(() => {
    ref.current = value;
  });
  // Retorna o valor anterior (acontece antes da atualização no useEffect acima)
  return ref.current;
}
