export const columns = [
    { title: "Federico", field: "name" },
    { title: "Fellini", field: "surname" },
    { title: "Birth Year", field: "birthYear" },
    {
      title: "Birth City",
      field: "Rome",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
    }
]

export const columnData = [
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
]