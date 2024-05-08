document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
    const table = document.getElementById('dataTable');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const slicedData = data.slice(0, 10);

            // Map sliced data with an index
            const indexedSubset = slicedData.map((item, index) => ({ // Adjust index to start at 1 instead of 0
                id: item.id,
                name: item.name,
                language: item.language,
                version: item.version
            }));

            console.log(indexedSubset)

            indexedSubset.forEach(item => {

          

                const row = document.createElement('tr');
                
                const cellName = document.createElement('td');
                cellName.textContent = item.name;
                row.appendChild(cellName);

                const cellLanguage = document.createElement('td');
                cellLanguage.textContent = item.language;
                row.appendChild(cellLanguage);

                const cellId = document.createElement('td');
                cellId.textContent = item.id;
                row.appendChild(cellId);

                const cellVersion = document.createElement('td');
                cellVersion.textContent = item.version;
                row.appendChild(cellVersion);

                table.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading data:', error));
});
