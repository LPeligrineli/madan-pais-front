import type { NextPage } from 'next';
import { Container, Grid, Input, Radio } from '@mui/material';
import Image from 'next/image';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import Parse from 'parse';

const Home: NextPage = () => {
  const [cupText, setCupText] = useState<string>('Amor');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [font, setFont] = useState<string>('');

  const data = {
    name: cupText,
    font: font,
  };

  Parse.initialize("ifyXZVLs0DCNhFGgtrtoGwja8Q5S1BuiMBc7rXxO", "G92lo6ZoWozuKv6bXLk0k2ndvIo78JZTP9rX6UMM");
  Parse.serverURL = 'https://parseapi.back4app.com/';

  useEffect(() => {

    const Options = Parse.Object.extend('opcao');
    const query = new Parse.Query(Options);
    query.find().then((results: any) => {
      results.forEach((result: any) => {
        console.log(result.get('name'));
        console.log(result.get('font'));
      }
      );
    }).catch((error: any) => {
      console.error('Erro ao buscar as tarefas: ', error);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCupText(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };


  useEffect(() => {
    const fontStyles: any = {
      adlery: styles.font_adlery,
      'dreaming-outloud': styles.font_dreaming_outloud,
      'intro-script-demo': styles.font_intro_script_demo,
      'lovelo-black': styles.font_lovelo_black,
      'quiche-fine': styles.font_quiche_fine,
      sweetyhearts: styles.font_sweetyhearts,
    };

    const selectedFont = fontStyles[selectedValue] || styles.font_adlery;
    setFont(selectedFont);
  }, [selectedValue]);

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <button type="submit">Enviar</button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
