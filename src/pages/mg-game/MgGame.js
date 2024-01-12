import { LitElement, html, css } from 'lit';
import "../../components/mg-card/mg-card.js";

export class MgGame extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            .cards-container{
                margin: 0 auto;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content:center;
                gap: 10px;
            }

            mg-card{
                width: 100px;
                height: 100px;
            }
        `
    ];

    static properties = {
        cards: { type: Array },
    }

    constructor(){
        super();
        this.cards = Array.from({ length: 9 }, (_, index) => ({ number: index + 1 }));
    }
    
    render() {
        return html`
        <div class='cards-container'>
            ${this.cards.map(
                card =>
                html`
                    <mg-card .number=${card.number}></mg-card>
                `
            )}
        </div>
        
        `;
    }
}
