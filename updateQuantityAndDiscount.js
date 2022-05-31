//Inicializa variables
let table = base.getTable('Tarifa');
let view = table.getView('Tarifa');
let records = await view.selectRecordsAsync({fields: []});

let updateRecords = [];

if (records.recordIds.length > 0) {
    records.recordIds.forEach(record => {
        // set null for number fields and '' for text fields
        updateRecords.push({
            id: record, 
            fields: {
                'Quantity': null,
                '% DTO': null
            }
        });
    });
}

// update records in batch of 50
while (updateRecords.length > 0) {
    await table.updateRecordsAsync(updateRecords.slice(0, 50));
    updateRecords = updateRecords.slice(50);
}