const fs = require('fs');

const fileName = 'sample.txt';

// 1️⃣ Create / Write File
fs.writeFile(fileName, 'Hello! This is the initial content.\n', (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }
    console.log('File created successfully.');

    // 2️⃣ Read File
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('\nFile Content after write:\n', data);

        // 3️⃣ Append Data
        fs.appendFile(fileName, 'This line is appended.\n', (err) => {
            if (err) {
                console.error('Error appending file:', err);
                return;
            }
            console.log('\nData appended successfully.');

            // 4️⃣ Read Again
            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                console.log('\nFile Content after append:\n', data);

                // 5️⃣ Delete File
                fs.unlink(fileName, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return;
                    }
                    console.log('\nFile deleted successfully.');
                });
            });
        });
    });
});