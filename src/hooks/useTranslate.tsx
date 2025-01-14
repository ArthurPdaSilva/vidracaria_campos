const useTranslate = () => {
  const lib = {
    add: 'Novo',
    edit: 'Editar',
    products: 'Produtos',
    services: 'Serviços',
    customers: 'Clientes',
    glassprice: 'Preços',
  } as const;

  type LibKeys = keyof typeof lib;

  const translate = (value: string): string => {
    const valueLower = value.toLowerCase() as LibKeys;
    const key = Object.keys(lib).find(
      (key) => key.toLowerCase() === valueLower,
    ) as LibKeys;
    return lib[key] || value;
  };

  return { translate };
};

export default useTranslate;
