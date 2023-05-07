import { DotenvParseOutput,config } from "dotenv";
import { IConfigInterface } from "./config.interface";

export class ConfigService implements IConfigInterface{
    private config:DotenvParseOutput;
    constructor(){
        const {error,parsed} = config();
        if(error){
            throw new Error('No dotenv file found ')
        }
        if(!parsed){
            throw new Error('Dotenv file is empty!')
        }
        this.config =parsed;
    } 
    get(key: string): string {
        const res =this.config[key];
        if(!res){
            throw new Error('No such key! ')
        }
        return res;
    }
}