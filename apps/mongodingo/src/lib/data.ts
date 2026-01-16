export async function getLearnData() {
  const res = await fetch('http://localhost:3000/api/lessons', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch learn data');
  }

  return res.json();
}

export async function getCareers() {
  const res = await fetch('http://localhost:3000/api/career-opportunities', {
    cache: 'no-store',
  });
  return res.json();
}

export async function getStudyPaths() {
  const res = await fetch('http://localhost:3000/api/study-paths', {
    cache: 'no-store',
  });
  return res.json();
}

export async function getMajors() {
  const res = await fetch('http://localhost:3000/api/majors', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.res;
}
