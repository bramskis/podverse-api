export { authenticate } from '~/middleware/auth/authenticate'
export { jwtAuth, optionalJwtAuth} from '~/middleware/auth/jwtAuth'
export { logOut } from '~/middleware/auth/logOut'
export { localAuth } from '~/middleware/auth/localAuth'
export { emailNotExists, signUpUser, validEmail } from '~/middleware/auth/signUpUser'
export { resetPassword, sendResetPassword } from '~/middleware/auth/resetPassword'
export { sendVerification, verifyEmail } from '~/middleware/auth/verification'
