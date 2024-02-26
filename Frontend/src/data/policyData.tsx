export const ageRanges = [
    {
        id: 0,
        label: "Chọn độ tuổi",
        basic: 0,
        medium: 0,
        premium: 0
    },
    {
        id: 1,
        label: "Từ 1 - 3 tuổi",
        basic: 2500000,
        medium: 10400000,
        premium: 21500000
    },
    {
        id: 2,
        label: "Từ 4 - 6 tuổi",
        basic: 1450000,
        medium: 6553000,
        premium: 13833000
    },
    {
        id: 3,
        label: "Từ 7 - 9 tuổi",
        basic: 1320000,
        medium: 6087000,
        premium: 12930000
    },
    {
        id: 4,
        label: "Từ 10 - 18 tuổi",
        basic: 1225800,
        medium: 5868000,
        premium: 12599000
    },
    {
        id: 5,
        label: "Từ 10 - 18 tuổi",
        basic: 1225800,
        medium: 5868000,
        premium: 12499000
    },
    {
        id: 6,
        label: "Từ 19 - 30 tuổi",
        basic: 1196000,
        medium: 5360000,
        premium: 11190000
    },
    {
        id: 7,
        label: "Từ 31 - 40 tuổi",
        basic: 1315000,
        medium: 5776000,
        premium: 12009000
    },
    {
        id: 8,
        label: "Từ 41 - 50 tuổi",
        basic: 1375000,
        medium: 5984000,
        premium: 12418000
    },
    {
        id: 9,
        label: "Từ 51 - 60 tuổi",
        basic: 1435000,
        medium: 6192000,
        premium: 12828000
    }
]

export const InsurancePackagesSamples = [
    {
        package_id: 1,
        name: 'Gói cơ bản',
        values: [93.8, 0, 0],
        insuranceAnuallFee: ageRanges[5]['basic']
    },
    {
        package_id: 2,
        name: 'Gói toàn diện',
        values: [230, 6, 5],
        insuranceAnuallFee: ageRanges[5]['medium']
    },
    {
        package_id: 3,
        name: 'Gói cao cấp',
        values: [454, 15, 15],
        insuranceAnuallFee: ageRanges[5]['premium']
    }
]

export const InsurancePackagesTypes = [
    {
        package_id: 0,
        name: 'Chọn gói bảo hiểm'
    },
    {
        package_id: 1,
        name: 'Gói cơ bản'
    },
    {
        package_id: 2,
        name: 'Gói toàn diện'
    },
    {
        package_id: 3,
        name: 'Gói cao cấp'
    }
]