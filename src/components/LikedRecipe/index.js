/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
// import data from '../Carousal/data';
import useSWR from 'swr';
import { coursesQuery } from '@hooks/useCoursesApiHook';
import TextEle from '../TextEle';

const LikedRecipe = ({ onRecipeDetail }) => {
  const { colors } = useTheme();
  const { data } = useSWR([coursesQuery(0, 5, 'updated_at:DESC')]);

  // const createLikedCourse = useCallback(async () => {
  //   const authHeader = `Basic ${base64.encode('rzp_test_YI9BcxZ3N5ZRSL:gwpwHJWIcCaFYd6mmGdDCUY9')}`;
  //   const receipt = uuidv4();
  //   const res = await axios.post(
  //     `https://6f057eda63ea.ngrok.io/Likes?user_id=${userId}&course=${data?.course?.id}`,
  //     {
  //       amount: data?.course?.price * 100,
  //       currency: data?.course?.currency,
  //       receipt,
  //     },
  //     {
  //       headers: { Authorization: authHeader },
  //     },
  //   );
  //   const orderDetails = await utilsAxios.post('purchase-details', {
  //     receipt,
  //     user_id: userId,
  //     course: data?.course?.id,
  //     amount: data?.course?.price,
  //     validity: data?.course?.validity,
  //     currency: res.data.currency,
  //     razorpay_order_id: res.data.id,
  //     amount_paid: res.data.amount_paid,
  //     amount_due: res.data.amount_due,
  //     offer_id: res.data.offer_id,
  //     status: res.data.status,
  //     attempts: res.data.attempts,
  //   });
  //   navigation.navigate('PurchaseUser', {
  //     orderDetails: orderDetails.data,
  //   });
  // }, [
  //   data?.course?.price,
  //   data?.course?.currency,
  //   data?.course?.id,
  //   data?.course?.validity,
  //   userId,
  //   navigation,
  // ]);

  // const likedCourse = useCallback(async () => {
  //   try {
  //     const likedRes = await utilsAxios.get(
  //       `https://6f057eda63ea.ngrok.io/Likes?user_id=${userId}&course=${data?.course?.id}`,
  //     );

  //     if ( likedRes === 0) {
  //       createPurchaseOrder();
  //     } else if (!purchaseRes.data.slice(-1)[0].purchase_date) {
  //       updatePurchaseOrder(purchaseRes.data.slice(-1)[0].id);
  //     } else if (purchaseRes.data.slice(-1)[0].purchase_date) {
  //       const purchaseOverDate = addDays(
  //         new Date(purchaseRes.data.slice(-1)[0].purchase_date),
  //         purchaseRes.data.slice(-1)[0].validity,
  //       );
  //       // TODO: Replace with server date
  //       if (isAfter(new Date(), purchaseOverDate)) {
  //         createPurchaseOrder();
  //       } else {
  //         showErrorToast(new Error('You Have already Purchased this course'));
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [createPurchaseOrder, updatePurchaseOrder, userId, data?.course?.id]);

  return (
    <BottomSheetView style={{ flex: 1, backgroundColor: colors.background, borderRadius: 20 }}>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
        <TextEle
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            marginVertical: 15,
          }}>
          Liked Recipes
        </TextEle>
        <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center' }} />
      </View>
      <BottomSheetScrollView contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
        {data?.courses.map(item => (
          <View
            key={item.id}
            style={{ flex: 1, flexDirection: 'row', marginVertical: 5, height: 100 }}>
            <Image
              style={{ height: 100, width: 100, borderRadius: 20 }}
              source={{ uri: item?.image?.url }}
            />
            <RectButton
              rippleColor="#D3D3D3"
              style={{ flex: 1 }}
              onPress={() => onRecipeDetail(item)}>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 15,
                  justifyContent: 'center',
                }}>
                <TextEle style={{ fontWeight: 'bold', fontSize: 17 }}>{item.name}</TextEle>
                <TextEle style={{ color: 'gray' }}>{item.caption}</TextEle>
              </View>
            </RectButton>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheetView>
  );
};

LikedRecipe.propTypes = {
  onRecipeDetail: PropTypes.func.isRequired,
};

export default LikedRecipe;
