import Container from "./aetherium/Container";
import Text from "./aetherium/Text";
import Modal from "./Modal";
import Guest from "./rsvp/Guest";
import { Button } from "./ui/button";
import { useWeddingContext } from "./WeddingProvider";

const RSVPModal = () => {
  const { tangerineFont } = useWeddingContext();

  return (
    <Modal className="p-4 bg-black size-full rounded-none space-y-8 overflow-y-auto">
      <h1 className={`text-6xl text-center ${tangerineFont}`}>RSVP</h1>
      <Text className="text-center font-medium mb-8">Kindly RSVP by confirming the details of the invitation you were provided.</Text>

      <Container className="bg-white/10 border-neutral-500 border py-8 px-4 space-y-8">
        <h3 className={`text-5xl text-center ${tangerineFont}`}>Jean & Lisa Cabera</h3>
        <Container className="space-y-8">
          <Guest name="Jean Cabrera" />
          <Guest name="Lisa Cabrera" />
          <Guest name="Aries Cabrera" />
          <Guest name="Esmae Cabrera" />
        </Container>
        <Button className="bg-emerald-700 font-medium rounded-none">Confirm RSVP</Button>
      </Container>
    </Modal>
  );
};

export default RSVPModal;
