//Inicializa variables
let table = base.getTable('Tarifa');
let records = await table.selectRecordsAsync({fields: ['Quantity']});

// get OFFER record to link in OFFER field
let offerTable = base.getTable('OFFER');
let offerRecords = await offerTable.selectRecordsAsync({fields: []});

let updateRecords = [];

if (records.records.length > 0) {
    records.records.forEach(record => {
        // set null for number fields and '' for text fields
        if (record.getCellValue('Quantity') > 0) {
            updateRecords.push({
                id: record.id, 
                fields: {
                    'Selected': true,
                    'OFFER': [{id: offerRecords.records[0].id}]
                }
            });
        }
    });
}

// update records in batch of 50
while (updateRecords.length > 0) {
    await table.updateRecordsAsync(updateRecords.slice(0, 50));
    updateRecords = updateRecords.slice(50);
}