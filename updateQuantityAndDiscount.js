//Inicializa variables
let table = base.getTable('Tarifa');
let records = await table.selectRecordsAsync({fields: ['Quantity', '% DTO', 'Selected', 'OFFER']});

let updateRecords = [];

if (records.records.length > 0) {
    records.records.forEach(record => {
        // set null for fields to reset
        if (record.getCellValue('Quantity') > 0 || record.getCellValue('Selected') == true || record.getCellValue('% DTO') > 0) {
            updateRecords.push({
                id: record.id, 
                fields: {
                    'Quantity': null,
                    '% DTO': null,
                    'Selected': false,
                    'OFFER': null
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