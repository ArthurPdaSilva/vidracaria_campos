import * as Yup from 'yup';

export const FinancialReportSchema = Yup.object().shape({
  startDate: Yup.string().required('Campo obrigatório'),
  endDate: Yup.string()
    .required('Campo obrigatório')
    .test(
      'is-endDate-greater',
      'A data final deve ser posterior à data inicial',
      function (value) {
        const { startDate } = this.parent;
        return new Date(value) > new Date(startDate);
      },
    )
    .test(
      'is-within-one-year',
      'A diferença entre as datas não pode ser maior que 1 ano',
      function (value) {
        const { startDate } = this.parent;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(value);
        const oneYearLater = new Date(startDateObj);
        oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
        return endDateObj <= oneYearLater;
      },
    ),
});
