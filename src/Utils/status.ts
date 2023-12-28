export const parseStatus = (status: string) => {
    if (status === '0') {
        return 'Pending'
    }
    if (status === '1') {
        return 'Active'
    }
    if (status === '2') {
        return 'Rejected'
    }
    if (status === '3') {
        return 'Out of Stock'
    }
    if (status === '4') {
        return 'Draft'
    }
    if (status === '5') {
        return 'Trashed'
    }
    if (status === '6') {
        return 'Blocked'
    }
}

export const parseStatusColor = (status: string) => {
    if (status === '0') {
        return '#FFAD33'
    }
    if (status === '1') {
        return '#279F51'
    }
    if (status === '2') {
        return '#D65D5B'
    }
    if (status === '3') {
        return '#FFAD33'
    }
    if (status === '4') {
        return '#FFAD33'
    }
    if (status === '5') {
        return '#D65D5B'
    }
    if (status === '6') {
        return '#D65D5B'
    }
    if (status === 'Pending') {
        return '#FFAD33'
    }
    if (status === 'Suspended') {
        return '#FFAD33'
    }
    if (status === 'Active') {
        return '#279F51'
    }
    if (status === 'Blocked') {
        return '#D65D5B'
    }
    if (status === 'Rejected') {
        return '#D65D5B'
    }
}
