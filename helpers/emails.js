import nodemailer from 'nodemailer'

export const emailRegister = async (data) => {
    const {email, nombre,token} = data
   
    const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP
    }
  });
    // Develop an email template
    const info = await transport.sendMail({
        from:' UPTASK - Administrador de proyectos <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Comprueba tu Cuenta",
        text: "Comprueba tu cuenta en UPTASK",
        html:` 
        <p>Hola : ${nombre} . Comprueba tu cuenta</p>
        <p> Tu cuenta ya está casi lista, solo debes comprobarla con el siguiente enlace: 
        
        <a href=${process.env.CONFIRM_ACOUNT}/confirm-account/${token}>Comprobar Cuenta </a>
        
        </p> 

        <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}
export const emailOlvidePassword = async (data) => {
    const {email, nombre,token} = data
   
    const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP
    }
  });
    // Develop an email template
    const info = await transport.sendMail({
        from:' UPTASK - Administrador de proyectos <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Recupera tu contraseña",
        text: "Recupera tu contraseña",
        html:` 
        <p>Hola : ${nombre} . Recupera tu contraseña</p>
        <p> Recupera tu contraseña a través del siguiente enlace: 
        
        <a href=${process.env.CONFIRM_ACOUNT}/forgot-password/${token}>Comprobar Cuenta </a>
        
        </p> 

        <p> Si no realizaste esta operación, podes ignorar el mensaje</p>
        `
    })
}

