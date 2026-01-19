import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordStrengthValidator(control:AbstractControl):ValidationErrors|null{
    const value=control.value||'';
    if(!value){
        return null;
    }
    const hasUpperCase=/[A-Z]/.test(value);
    const hasLowerCase=/[a-z]/.test(value);
    const hasNo=/[0-9]/.test(value);
    const hasSpecialCase=/[^a-zA-Z0-9]/.test(value);
    const hasMinLength=value.length>=6;
    if(hasLowerCase && hasMinLength && hasUpperCase && hasNo && hasSpecialCase){
        return null;
    }
    return {pwdStrength:{hasLowerCase , hasMinLength , hasUpperCase , hasNo , hasSpecialCase}}
}