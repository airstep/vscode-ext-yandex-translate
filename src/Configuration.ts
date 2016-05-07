import {WorkspaceConfiguration} from 'vscode';

export class Configuration {
    private from = "en";
    private to = "ru";
    private key = "trnsl.1.1.20160506T075024Z.afdb1ae6a3736b3d.72241d8bd16449900486e199be85b31ecc385a7a";
    
    public getFrom()  {
        return this.from;
    }
    
    public getTo()  {
        return this.to;
    }
    
    public setFrom(value) {
        this.from = value;
    }
    
    public setTo(value) {
        this.to = value;
        
    }
    
    public getApiKey() {
        return this.key;
    }    
    
    public setApiKey(value) {
        this.key = value;
    }
}