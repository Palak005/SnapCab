export const getFare = ({distance, vehicleType})=>{
    const pricing = {
        car : {
            base : 50,
            perKm : 15,
        },
        auto : {
            base : 30,
            perKm : 10,
        },
        bike : {
            base : 20,
            perKm : 7,
        },
        "tukk tukk" : {
            base : 25,
            perKm : 8,
        }
    }

    const price = pricing[vehicleType.toLowerCase()];
    const fare = price.base + price.perKm*distance;

    return Math.round(fare);
}