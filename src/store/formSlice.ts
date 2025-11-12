import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  companyName?: string;
  companyMobileNumber?: string;
  companyMobileExt?: string;
  companyEmailAddress?: string;
  businessAddress?: string;
  federalTaxClassification?: string;
  taxNumber?: string;
  requestedCreditAmount?: string;
  numberOfEmployees?: string;
  yearEstablished?: string;
  applicantFirstName?: string;
  applicantLastName?: string;
  applicantEmailAddress?: string;
  applicantAddress?: string;
  applicantMobileNumber?: string;
  applicantMobileExt?: string;
  applicantJobTitle?: string;
  applicantDateOfBirth?: string;
  isSubmitted: boolean;
}

const initialState: FormState = {
  companyName: '',
  companyMobileNumber: '',
  companyMobileExt: '',
  companyEmailAddress: '',
  businessAddress: '',
  federalTaxClassification: '',
  taxNumber: '',
  requestedCreditAmount: '',
  numberOfEmployees: '',
  yearEstablished: '',
  
  isSubmitted: false,

};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      Object.assign(state, action.payload);
    },
    submitForm: (state) => {
      state.isSubmitted = true;
    },
    resetForm: (state) => {
      state.companyName = '';
      state.companyMobileNumber = '';
      state.companyMobileExt = '';
      state.companyEmailAddress = '';
      state.businessAddress = '';
      state.federalTaxClassification = '';
      state.taxNumber = '';
      state.requestedCreditAmount = '';
      state.numberOfEmployees = '';
      state.yearEstablished = '';
      state.isSubmitted = false;
    },
  },
});

export const { setFormData, submitForm, resetForm } = formSlice.actions;
export default formSlice.reducer;