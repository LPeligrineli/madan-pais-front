import type { NextPage } from 'next';
import { Button, Container, Grid, Input, Radio } from '@mui/material';
import Image from 'next/image';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import api from './api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { captureScreenshotAndDownload } from '../utils/printScreen';
import generateRandomHash from '../utils/hash';
import { fontStyle } from '../enum/font_styles';


const Home: NextPage = () => {
  const [cupText, setCupText] = useState<string>('Amor');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [font, setFont] = useState(fontStyle.ADLERY);

  const data = {
    hash: generateRandomHash(),
    nome: cupText,
    fonte: selectedValue,
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCupText(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };


  useEffect(() => {
    const fontStyles: any = {
      adlery: fontStyle.ADLERY,
      'dreaming-outloud': fontStyle.DREAMING_OUTLOUD,
      'intro-script-demo': fontStyle.INTRO_SCRIPT,
      'lovelo-black': fontStyle.LOVELO_BLACK,
      'quiche-fine': fontStyle.QUICHE_FINE,
      sweetyhearts: fontStyle.SWEETYHEARTS,
    };

    const selectedFont = fontStyles[selectedValue] || styles.font_adlery;
    setFont(selectedFont);
  }, [selectedValue]);

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedValue) {
      toast.warn("Escolha uma fonte");
      return;
    }
    if (!cupText) {
      toast.warn("Digite um texto");
      return;
    }
    api.post('zxqc6tg82up91', data)
      .then((_) => {
        toast.success("Solicitação incluida com sucesso!");
        captureScreenshotAndDownload(data.nome, data.hash);
      }
      ).catch((error) => {
        toast.error(error);
      }
      );
  };


  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={styles.logo}>
            <Image src="/images/Logo1.png" alt="Logo Grand Plaza" width={420} height={150} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={`${styles.cup} ${font}`}>
            <Image priority src="/images/xicara.svg" alt="Xicara Promocional" width={620} height={380} />
            <div className={styles.cup__text}>
              <span>{cupText}</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <form className={styles.form} onSubmit={onsubmit}>
            <div>
              <h2>Digite o nome, apelido ou palavra de preferência</h2>
              <Input fullWidth placeholder="Amor..." onChange={handleChange} />
            </div>
            <div>
              <h2>Escolha a fonte de sua preferência</h2>
              <Grid container>
                <Grid item xs={4}>
                  <Radio
                    checked={selectedValue === 'adlery'}
                    name="font"
                    value="adlery"
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'adlery' }}
                  />
                  <span className={styles.font_adlery}>Amor</span>
                </Grid>
                <Grid item xs={4}>
                  <Radio
                    checked={selectedValue === 'dreaming-outloud'}
                    name="font"
                    value="dreaming-outloud"
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'dreaming-outloud' }}
                  />
                  <span className={styles.font_dreaming_outloud}>Amor</span>
                </Grid>
                <Grid item xs={4}>
                  <Radio
                    checked={selectedValue === 'intro-script-demo'}
                    name="font"
                    value="intro-script-demo"
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'intro-script-demo' }}
                  />
                  <span className={styles.font_intro_script_demo}>Amor</span>
                </Grid>
                <Grid item xs={4}>
                  <Radio
                    checked={selectedValue === 'lovelo-black'}
                    name="font"
                    value="lovelo-black"
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'lovelo-black' }}
                  />
                  <span className={styles.font_lovelo_black}>Amor</span>
                </Grid>
                <Grid item xs={4}>
                  <Radio
                    checked={selectedValue === 'quiche-fine'}
                    name="font"
                    value="quiche-fine"
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'quiche-fine' }}
                  />
                  <span className={styles.font_quiche_fine}>Amor</span>
                </Grid>
                <Grid item xs={4}>
                  <Radio
                    checked={selectedValue === 'sweetyhearts'}
                    name="font"
                    value="sweetyhearts"
                    onChange={handleSelect}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <span className={styles.adlery}>Amor</span>
                </Grid>
              </Grid>
            </div>
            <Button variant="contained" color="primary" type="submit" fullWidth>Enviar</Button>
          </form>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Home;
