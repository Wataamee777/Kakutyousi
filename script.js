let data = {};

fetch('data.json')
  .then(res => res.json())
  .then(json => data = json)
  .catch(err => console.error('データ読み込み失敗:', err));

function search() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const result = document.getElementById('result');
  result.innerHTML = '';

  if (data[query]) {
    const ext = data[query];
    result.innerHTML = formatExtension(query, ext);
  } else {
    result.textContent = '該当する拡張子が見つかりませんでした。';
  }
}

function showCategory(category) {
  const result = document.getElementById('categoryResult');
  result.innerHTML = '';
  let found = false;

  for (const [ext, info] of Object.entries(data)) {
    if (info.category === category) {
      result.innerHTML += formatExtension(ext, info);
      found = true;
    }
  }

  if (!found) {
    result.textContent = 'このカテゴリには拡張子が登録されていません。';
  }
}

function formatExtension(ext, info) {
  return `
    <div>
      <h3>.${ext}</h3>
      <p>${info.description}</p>
      <p><strong>MIME:</strong> ${info.mime}</p>
      <p><strong>使用例:</strong> ${info.programs.join(', ')}</p>
    </div>
    <hr/>
  `;
}
