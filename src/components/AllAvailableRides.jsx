import {  useQueryClient } from "@tanstack/react-query";

const AllAvailableRides = () => {
  const queryClient = useQueryClient();

  const allRides = useQuery({
    queryKey: ["availableRides"],
    queryFn: getAllAvailableRides
  });
  return(
    availableRides.map((ride)=><section>
      <p>{ride.startLocation}</p>
    </section>)
  ) ;
};

export default AllAvailableRides;
