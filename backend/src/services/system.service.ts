export class SystemService {
    private static formsEnabled = true;

    static toggleForm(): boolean {
        this.formsEnabled = !this.formsEnabled;
        return this.formsEnabled
    }
    static getFormStatus(): boolean {
        return this.formsEnabled
    }
    static enableForm(): boolean {
        this.formsEnabled = true;
        return this.formsEnabled
    }
    static disableForm(): boolean {
        this.formsEnabled = false;
        return this.formsEnabled
    }
}