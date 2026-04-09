export default function Home() {

const {user, loading} = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if(!loading) {
      if(user) {
        router.replace("/home");
      } else {
      router.replace("/(auth)") //or week-9 
      }
    }
  }, [user, loading, router]);
}