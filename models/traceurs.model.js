const mongoose = require('mongoose');

// Definizione del modello Studente
const TraceursSchema = new mongoose.Schema(
    {
        // Campo per il nome dello studente (stringa, obbligatorio)
        nome: {
            type: String,
            required: [true, "Il nome è obbligatorio"]
        },
        
        // Campo per indicare se lo studente è iscritto (booleano, obbligatorio)
        inscritto: {
            type: Boolean,
            required: [true, "Lo stato di iscrizione è obbligatorio"],
            default: false
        },

        // Campo per indicare se lo studente ha un certificato medico (booleano, obbligatorio)
        certificato_medico: {
            type: Boolean,
            required: [true, "Lo stato del certificato medico è obbligatorio"],
            default: false
        },

        // Campo per la data di scadenza del certificato medico (solo se certificato_medico è true)
        data_scadenza_certificato: {
            type: Date,
            required: function() {
                return this.certificato_medico === true;
            }
        },

        // Array di pagamenti
        pagamenti: [
            {
                // Primo pagamento associato all'iscrizione
                iscrizione: {
                    type: Boolean,
                    required: true,
                    default: true // Questo indica che il primo pagamento è legato all'iscrizione
                },
                // Data del pagamento (time stamp)
                data_pagamento: {
                    type: Date,
                    required: true
                },
                // Importo del pagamento
                importo: {
                    type: Number,
                    required: [true, "L'importo è obbligatorio"],
                    min: [0, "L'importo deve essere positivo"]
                },
                // Mese a cui è associato il pagamento (da settembre a luglio)
                mese: {
                    type: String,
                    enum: [
                        "Settembre", "Ottobre", "Novembre", "Dicembre", "Gennaio", 
                        "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio"
                    ],
                    required: function() {
                        return this.iscrizione === false;
                    } // Il mese è richiesto solo per i pagamenti non di iscrizione
                }
            }
        ]
    },
    {
        // Abilita i timestamp automatici (createdAt, updatedAt)
        timestamps: true
    }
);

// Creazione del modello Student
const Traceurs = mongoose.model("Traceurs", TraceursSchema);

// Esportazione del modello
module.exports = Traceurs;
