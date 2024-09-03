const useRegex = () => {
  function handleChangePhone(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const inputPhoneNumber = event.target.value.replace(/\D/g, '');
    const formattedPhoneNumber = inputPhoneNumber.replace(
      /^(\d{2})(\d{4,5})(\d{4})$/,
      '($1) $2-$3',
    );

    event.target.value = formattedPhoneNumber;
  }

  function handleChangeCpfCnpj(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const inputCpfCnpj = event.target.value.replace(/\D/g, '');

    const isCpf = inputCpfCnpj.length === 11;

    const formattedCpfCnpj = isCpf
      ? inputCpfCnpj.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
      : inputCpfCnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          '$1.$2.$3/$4-$5',
        );

    event.target.value = formattedCpfCnpj;
  }

  return { handleChangePhone, handleChangeCpfCnpj };
};

export default useRegex;
