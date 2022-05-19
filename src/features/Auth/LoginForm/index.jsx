import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/form-controls/InputField';
import PasswordField from '../../../components/form-controls/PasswordField';
import React from 'react';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

LoginForm.propTypes = {

};

function LoginForm(props) {
   const schema = yup.object().shape({
      username: yup.string().required('Please enter your email.'),
      password: yup.string().required('Please enter your password.'),
   })

   const form = useForm({
      defaultValues: {
         username: '',
         password: '',
      },
      resolver: yupResolver(schema),
   });

   const { isSubmitting } = form.formState;

   const handleSubmit = async (values) => {
      const { onSubmit } = props;
      if (onSubmit) {
         await onSubmit(values);
      }
   };

 
   return (
      <form onSubmit={form.handleSubmit(handleSubmit)} >
         <div className="login__input-label">
            <label htmlFor="username">Username</label>
         </div>
         <InputField className="login__input" size="large" form={form} name="username" placeholder="Username" />

         <div className="login__input-label">
            <label htmlFor="password">Password</label>
         </div>
         <PasswordField className="login__input" size="x-large" form={form} name="password"  placeholder="Password" />
         <Button
            className="login__btn"
            htmlType="submit"
            loading={isSubmitting}
         >
            Sign in
         </Button>
      </form>
   );
}

export default LoginForm;